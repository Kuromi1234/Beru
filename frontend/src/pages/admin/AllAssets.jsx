import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;

export default function AllAssets() {
  const [assets, setAssets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/assets/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch assets");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredData = assets.filter(
      (a) =>
        a.name.toLowerCase().includes(value) ||
        a.serialNumber.toLowerCase().includes(value) ||
        a.model.toLowerCase().includes(value) ||
        a.assetType.toLowerCase().includes(value) ||
        a.status.toLowerCase().includes(value) 
    );
    setFiltered(filteredData);
    setPage(1); // Reset to first page
  };

  const exportToCSV = () => {
    const csv = [
      ["Name", "Serial", "Model", "Type", "Status"],
      ...filtered.map((a) => [
        a.name,
        a.serialNumber,
        a.model,
        a.assetType,
        a.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "assets.csv";
    a.click();
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this asset?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/assets/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Asset deleted");
      fetchAssets();
    } catch {
      toast.error("❌ Failed to delete asset");
    }
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentAssets = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const StatusBadge = ({ status }) => {
    const colorMap = {
      in_stock: "bg-green-600/20 text-green-300",
      assigned: "bg-blue-600/20 text-blue-300",
      damaged: "bg-red-600/20 text-red-300",
      repair: "bg-yellow-500/20 text-yellow-300",
      discarded: "bg-gray-500/20 text-gray-300",
      to_be_retrieved: "bg-orange-600/20 text-orange-300",
      retrieved: "bg-purple-600/20 text-purple-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status] || "bg-white/20 text-white"}`}
      >
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white">💼 All Assets</h1>
        <button
          onClick={exportToCSV}
          className="bg-purple-500/30 hover:bg-purple-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaFileDownload /> Export CSV
        </button>
      </motion.div>

      <div className="mb-6 flex justify-end">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-black/20 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-white/50" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white/10 backdrop-blur p-4 border border-white/10">
        <table className="w-full text-left table-auto text-white text-sm">
          <thead>
            <tr className="text-purple-300 border-b border-white/10">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Serial No</th>
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.map((asset, i) => (
              <motion.tr
                key={asset._id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="hover:bg-white/5 border-b border-white/10"
              >
                <td className="py-3 px-4">{asset.name}</td>
                <td className="py-3 px-4">{asset.serialNumber}</td>
                <td className="py-3 px-4">{asset.model}</td>
                <td className="py-3 px-4 capitalize">{asset.assetType}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={asset.status} />
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              page === i + 1
                ? "bg-purple-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-purple-500/20"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}