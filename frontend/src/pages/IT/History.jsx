import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFileDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

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
      const params = { page: pageNum, limit: 10 };

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
              <tr className="text-purple-300 border-b border-white/10">
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
                console.log("History item:", item),
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="relative group hover:bg-white/5 border-b border-white/10"
                >
                  {item.action === "bulk_upload" ? (
                    <td colSpan={8} className="py-2 px-4">
                      <BulkUploadHover item={item} />
                    </td>
                  ) : (
                    <>
                      <td className="py-2 px-4">
                        {item.asset?.serialNumber || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {item.asset?.model || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {item.asset?.assetType || "N/A"}
                      </td>
                      <td className="py-2 px-4 capitalize">
                        {item.action || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {item.endUser?.name || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {item.endUser?.employeeId || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {item.assignedBy?.name || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
const BulkUploadHover = ({ item }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const update = () => {
      if (!anchorRef.current) return;
      const r = anchorRef.current.getBoundingClientRect();
      setPos({
        top: r.bottom + window.scrollY + 8,
        left: r.left + window.scrollX,
      });
    };
    update();

    if (open) {
      window.addEventListener("scroll", update, true);
      window.addEventListener("resize", update);
    }
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  return (
    <>
      <span
        ref={anchorRef}
        className="cursor-pointer text-purple-400 font-semibold"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        📦 Bulk Upload — {item.details?.totalUploaded || 0} added,{" "}
        {item.details?.totalSkipped || 0} skipped{" "}
        <span className="text-xs text-white/60">
          • By {item.user || "System"} •{" "}
          {new Date(item.createdAt).toLocaleString()}
        </span>
      </span>

      <AnimatePresence>
        {open &&
          anchorRef.current &&
          createPortal(
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                zIndex: 1000,
              }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <motion.div
                initial={{ boxShadow: "0 0 0px rgba(168,85,247,0)" }}
                animate={{ boxShadow: "0 0 20px rgba(168,85,247,0.6)" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="bg-black/90 text-white rounded-2xl shadow-2xl p-4 w-[300px] backdrop-blur-md border border-purple-500/20"
              >
                <h4 className="font-semibold text-lg mb-2">
                  Bulk Upload Details
                </h4>

                <p className="text-sm mb-1">
                  ✅ Uploaded:{" "}
                  <span className="font-bold text-green-400">
                    {item.details?.totalUploaded || 0}
                  </span>
                </p>
                <p className="text-sm mb-3">
                  ⚠️ Skipped:{" "}
                  <span className="font-bold text-red-400">
                    {item.details?.totalSkipped || 0}
                  </span>
                </p>

                <div className="border-t border-white/20 pt-2">
                  <h5 className="text-sm font-semibold mb-1">By Brand</h5>
                  <ul className="text-xs space-y-1">
                    {Object.entries(item.details?.brandCounts || {}).map(
                      ([brand, count]) => (
                        <li key={brand} className="flex justify-between">
                          <span>{brand}</span>
                          <span className="text-purple-300">{count}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="border-t border-white/20 pt-2 mt-2">
                  <h5 className="text-sm font-semibold mb-1">By Type</h5>
                  <ul className="text-xs space-y-1">
                    {Object.entries(item.details?.assetTypeCounts || {}).map(
                      ([type, count]) => (
                        <li key={type} className="flex justify-between">
                          <span>{type}</span>
                          <span className="text-blue-300">{count}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            </motion.div>,
            document.body
          )}
      </AnimatePresence>
    </>
  );
};
