import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFileDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import BulkUploadPopup from "../../components/BulkUploadPopup";
import BASE_URL from "../../utils/apiConfig";



export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmpId, setSearchEmpId] = useState("");
  const [searchSerial, setSearchSerial] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popupItem, setPopupItem] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  const fetchHistory = async (pageNum = 1) => {
    setLoading(true);
    try {
      const params = { page: pageNum, limit: 10 };

      if (searchEmpId.trim()) params.employeeId = searchEmpId.trim();
      if (searchSerial.trim()) params.serialNumber = searchSerial.trim();
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;

      const response = await axios.get(`${BASE_URL}/api/assets/history`, {
        params,
        ...getAuthHeaders(),
      });

      if (response.data.success) {
        setHistory(response.data.history);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error("❌ Failed to fetch history");
      }
    } catch {
      toast.error("❌ Error fetching history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchHistory(1);
  };

  const exportToCSV = () => {
    if (!history.length) {
      toast.error("❌ No data to export");
      return;
    }

    const csvRows = [
      [
        "Serial No",
        "Model",
        "Type",
        "Action",
        "End User",
        "Emp ID",
        "By",
        "Date",
      ],
      ...history.map((item) => [
        item.asset?.serialNumber || "N/A",
        item.asset?.model || "N/A",
        item.asset?.assetType || "N/A",
        item.action,
        item.endUser?.name || "N/A",
        item.endUser?.employeeId || "N/A",
        item.assignedBy?.name || "N/A",
        new Date(item.createdAt).toLocaleString(),
      ]),
    ];

    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `asset-history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("✅ CSV exported successfully");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          ASSET HISTORY
        </h1>
        <button
          onClick={exportToCSV}
          className="bg-purple-500/30 hover:bg-purple-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <FaFileDownload /> Export CSV
        </button>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-end">
        <div className="flex flex-col w-48">
          <label className="mb-1 text-sm text-white/70">Employee ID</label>
          <input
            type="text"
            value={searchEmpId}
            onChange={(e) => setSearchEmpId(e.target.value)}
            placeholder="Enter ID"
            className="bg-black/20 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col w-48">
          <label className="mb-1 text-sm text-white/70">Serial No</label>
          <input
            type="text"
            value={searchSerial}
            onChange={(e) => setSearchSerial(e.target.value)}
            placeholder="Enter Serial"
            className="bg-black/20 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col w-40">
          <label className="mb-1 text-sm text-white/70">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-black/20 border border-white/20 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col w-40">
          <label className="mb-1 text-sm text-white/70">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-black/20 border border-white/20 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-purple-500/30 hover:bg-purple-500/50 px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-all duration-200"
        >
          <FaSearch /> Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white/10 backdrop-blur p-4 border border-white/10">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-b-2 border-purple-500 rounded-full inline-block"></div>
            <p className="text-white/70 mt-2">Loading...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 text-white/70">
            <div className="text-4xl mb-4">📜</div>
            <p className="text-lg">No history found</p>
          </div>
        ) : (
          <table className="w-full text-left table-auto text-white text-sm">
            <thead>
              <tr className="text-purple-300 border-b border-white/10 text-sm">
                <th className="py-3 px-4">Serial No</th>
                <th className="py-3 px-4">Model</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Emp ID</th>
                <th className="py-3 px-4">By</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/5 border-b border-white/10 text-xs sm:text-sm"
                >
                  <td className="py-3 px-4">
                    {item.asset?.serialNumber || "N/A"}
                  </td>
                  <td className="py-3 px-4">{item.asset?.model || "N/A"}</td>
                  <td className="py-3 px-4">
                    {item.asset?.assetType || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {item.action === "bulk_upload" ? (
                      <button
                        onClick={() => setPopupItem(item)}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
                      >
                        Bulk Upload
                      </button>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.action === "assign"
                            ? "bg-green-500/20 text-green-400"
                            : item.action === "return"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {item.action || "N/A"}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{item.endUser?.name || "N/A"}</td>
                  <td className="py-3 px-4">
                    {item.endUser?.employeeId || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {item.assignedBy?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <BulkUploadPopup
        item={popupItem}
        open={!!popupItem}
        onClose={() => setPopupItem(null)}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setPage(i + 1);
                fetchHistory(i + 1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                page === i + 1
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-purple-500/20"
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
}
