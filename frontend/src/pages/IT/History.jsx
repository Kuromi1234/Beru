import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFileDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/assets/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data.history);
      setFiltered(res.data.history);
    } catch (err) {
      toast.error("❌ Failed to fetch history");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredData = history.filter(
      (entry) =>
        entry.asset?.serialNumber?.toLowerCase().includes(value) ||
        entry.asset?.model?.toLowerCase().includes(value) ||
        entry.asset?.assetType?.toLowerCase().includes(value) ||
        entry.endUser?.name?.toLowerCase().includes(value) ||
        entry.endUser?.employeeId?.toLowerCase().includes(value)
    );
    setFiltered(filteredData);
  };

  const exportToCSV = () => {
    const csv = [
      [
        "Serial Number",
        "Model",
        "Type",
        "Emp ID",
        "Name",
        "Email",
        "Action",
        "Date",
      ],
      ...filtered.map((h) => [
        h.asset?.serialNumber || "",
        h.asset?.model || "",
        h.asset?.assetType || "",
        h.endUser?.employeeId || "",
        h.endUser?.name || "",
        h.endUser?.email || "",
        h.returnedAt ? "returned" : "assigned",
        h.returnedAt
          ? new Date(h.returnedAt).toLocaleString()
          : new Date(h.assignedAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "asset_history.csv";
    a.click();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white">📜 Asset History</h1>
        <button
          onClick={exportToCSV}
          className="bg-purple-500/30 hover:bg-purple-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaFileDownload /> Export CSV
        </button>
      </motion.div>

      {/* Search */}
      <div className="mb-6 flex justify-end">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by serial/model/empid..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-black/20 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-white/50" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-xl bg-white/5 backdrop-blur border border-white/10">
        <table className="min-w-full text-sm text-white table-auto">
          <thead>
            <tr className="text-purple-300 border-b border-white/10 text-left">
              <th className="py-3 px-4">Serial</th>
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Emp ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <motion.tr
                key={entry._id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="hover:bg-white/5 border-b border-white/10"
              >
                <td className="py-3 px-4">{entry.asset?.serialNumber}</td>
                <td className="py-3 px-4">{entry.asset?.model}</td>
                <td className="py-3 px-4 capitalize">
                  {entry.asset?.assetType}
                </td>
                <td className="py-3 px-4">{entry.endUser?.employeeId}</td>
                <td className="py-3 px-4">{entry.endUser?.name}</td>
                <td className="py-3 px-4">{entry.endUser?.email}</td>
                <td className="py-3 px-4 capitalize text-purple-300">
                  {entry.returnedAt ? "returned" : "assigned"}
                </td>
                <td className="py-3 px-4">
                  {entry.returnedAt
                    ? new Date(entry.returnedAt).toLocaleString()
                    : new Date(entry.assignedAt).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
