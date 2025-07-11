import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaSyncAlt, FaTrash } from "react-icons/fa";

const dummyUsers = [
  {
    empid: "EMP001",
    name: "Arjun Nath",
    email: "arjun@beru.ai",
    department: "IT",
    status: "Active",
    assignedAssets: 3,
  },
  {
    empid: "EMP002",
    name: "Ishika Biswas",
    email: "ishika@beru.ai",
    department: "IT",
    status: "Inactive",
    assignedAssets: 1,
  },
];

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full max-w-7xl mx-auto text-white z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6 flex justify-between items-center flex-wrap gap-4"
      >
        <h2 className="text-3xl font-bold">All IT Users</h2>

        <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 shadow-inner backdrop-blur-md">
          <FaSearch className="text-purple-300 mr-2" />
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-slate-400 w-full"
          />
        </div>
      </motion.div>

      <div className="overflow-x-auto rounded-xl bg-white/5 backdrop-blur-md p-4 border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="text-purple-300 border-b border-white/10">
            <tr>
              <th className="py-2 px-3">Employee ID</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Department</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Assigned Assets</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.empid} className="hover:bg-white/10 transition">
                <td className="py-2 px-3">{user.empid}</td>
                <td className="py-2 px-3">{user.name}</td>
                <td className="py-2 px-3">{user.email}</td>
                <td className="py-2 px-3">{user.department}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-3 text-center">
                  {user.assignedAssets}
                </td>
                <td className="py-2 px-3 text-center flex gap-2 justify-center">
                  <button className="bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition">
                    <FaSyncAlt /> Reset
                  </button>
                  <button className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition">
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center text-slate-400 py-6">
            No matching users found.
          </p>
        )}
      </div>
    </section>
  );
}
