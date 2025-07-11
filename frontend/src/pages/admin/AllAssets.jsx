import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTrash, FaEdit, FaLaptop, FaDesktop } from "react-icons/fa";

const dummyAssets = [
  {
    id: "AS001",
    type: "Laptop",
    status: "In Stock",
    assignedTo: "Arjun Nath",
  },
  {
    id: "AS002",
    type: "Monitor",
    status: "Assigned",
    assignedTo: "Andrew Kharnaoir",
  },
  {
    id: "AS003",
    type: "Laptop",
    status: "Damaged",
    assignedTo: "—",
  },
];

const statusColors = {
  "In Stock": "bg-green-600",
  Assigned: "bg-yellow-500",
  Damaged: "bg-red-600",
};

export default function AllAssets() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = dummyAssets.filter((asset) =>
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-[80vh]">
      {/* Blurred Background */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse z-0" />

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-white"
        >
          All IT Assets
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-2/3 mx-auto flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 shadow-lg"
        >
          <FaSearch className="text-purple-300 mr-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Asset ID, Type, or Status"
            className="w-full bg-transparent focus:outline-none text-white placeholder-slate-400"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto rounded-xl border border-white/10 backdrop-blur-md bg-white/5"
        >
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-white/10 text-slate-300 uppercase text-sm tracking-wider">
              <tr>
                <th className="p-4">Asset ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-slate-400 p-6">
                    No matching assets found.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium">{asset.id}</td>
                    <td className="p-4 flex items-center gap-2">
                      {asset.type === "Laptop" ? (
                        <FaLaptop className="text-purple-400" />
                      ) : (
                        <FaDesktop className="text-purple-400" />
                      )}
                      {asset.type}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-white px-3 py-1 rounded-full text-xs ${statusColors[asset.status]}`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-4">{asset.assignedTo}</td>
                    <td className="p-4 flex justify-center gap-3">
                      <button className="text-red-400 hover:text-red-500 transition">
                        <FaTrash />
                      </button>
                      <button className="text-blue-400 hover:text-blue-500 transition">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
