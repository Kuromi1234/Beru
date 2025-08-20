import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFileDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const API_BASE_URL = "http://localhost:5000/api/assets/history";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmpId, setSearchEmpId] = useState("");
  const [searchSerial, setSearchSerial] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchHistory = async (pageNum = 1) => {
    setLoading(true);
    try {
      const params = {
        page: pageNum,
        limit: 10,
      };

      if (searchEmpId.trim()) params.employeeId = searchEmpId.trim();
      if (searchSerial.trim()) params.serialNumber = searchSerial.trim();
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;

      const response = await axios.get(API_BASE_URL, {
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
    } catch (err) {
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
      ["Asset Serial", "Model", "Type", "Action", "End User", "Date"],
      ...history.map((item) => [
        item.asset?.serialNumber || "N/A",
        item.asset?.model || "N/A",
        item.asset?.assetType || "N/A",
        item.action,
        item.endUser?.name || "N/A",
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
    <section className="max-w-7xl mx-auto px-6 py-10 bg-[#121217] rounded-xl shadow-lg text-white">
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-purple-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Asset History
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-end">
        <div className="flex flex-col w-48">
          <label className="mb-1 text-purple-300 font-semibold text-sm">Employee ID</label>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={searchEmpId}
            onChange={(e) => setSearchEmpId(e.target.value)}
            className="bg-[#1e1e2f] border border-purple-700 rounded-md px-3 py-2 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col w-48">
          <label className="mb-1 text-purple-300 font-semibold text-sm">Asset Serial No</label>
          <input
            type="text"
            placeholder="Enter Serial Number"
            value={searchSerial}
            onChange={(e) => setSearchSerial(e.target.value)}
            className="bg-[#1e1e2f] border border-purple-700 rounded-md px-3 py-2 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col w-40">
          <label className="mb-1 text-purple-300 font-semibold text-sm">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-[#1e1e2f] border border-purple-700 rounded-md px-3 py-2 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col w-40">
          <label className="mb-1 text-purple-300 font-semibold text-sm">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-[#1e1e2f] border border-purple-700 rounded-md px-3 py-2 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-md font-semibold flex items-center gap-2"
        >
          <FaSearch />
          Search
        </button>

        <button
          onClick={exportToCSV}
          className="bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded-md font-semibold flex items-center gap-2"
        >
          <FaFileDownload />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-purple-700 bg-[#1a1a2e] shadow-md">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-600"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center p-12 text-purple-300 text-lg">
            No asset history found.
          </div>
        ) : (
          <table className="min-w-full border-collapse table-auto text-white text-sm">
            <thead className="bg-[#241e4a] text-purple-300 uppercase text-xs font-semibold tracking-wide">
              <tr>
                <th className="py-3 px-4 border-b border-purple-600 text-left">Serial No</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">Model</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">Type</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">Action</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">User Name</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">User EmpId</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">Performed BY</th>
                <th className="py-3 px-4 border-b border-purple-600 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-[#2c2570] border-b border-purple-700 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{item.asset?.serialNumber || "N/A"}</td>
                  <td className="py-2 px-4">{item.asset?.model || "N/A"}</td>
                  <td className="py-2 px-4 capitalize">{item.asset?.assetType || "N/A"}</td>
                  <td className="py-2 px-4 capitalize">{item.action}</td>
                  <td className="py-2 px-4">{item.endUser?.name || "N/A"}</td>
                  <td className="py-2 px-4">{item.endUser?.employeeId || "N/A"}</td>
                  <td className="py-2 px-4">{item.assignedBy?.name || "N/A"}</td>

                  <td className="py-2 px-4">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setPage(i + 1);
                fetchHistory(i + 1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                page === i + 1
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-purple-300 hover:bg-purple-700"
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
