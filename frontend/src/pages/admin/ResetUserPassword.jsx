import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetUserPassword() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/search-users?query=${query}`);
      setUsers(res.data.users || []);
    } catch (err) {
      toast.error("Failed to fetch users.");
    }
  };

  const handleReset = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/admin-reset-password/${selectedUserId}`, {
        newPassword,
      });
      toast.success("✅ Password updated!");
      setNewPassword("");
      setSelectedUserId(null);
    } catch {
      toast.error("❌ Could not reset password.");
    }
  };

  return (
    <section className="w-full">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-purple-300"
      >
        🔐 Reset IT User Password
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-5 text-slate-400 text-sm px-4"
      >
        Search and Reset User Password
      </motion.p>


      {/* Search Input */}
      <div className="flex items-center justify-center gap-4 mb-6 pl-15">
        <input
          type="text"
          placeholder="Search by Employee ID or Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-full max-w-md rounded-lg bg-black/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Search Result Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-white/5 rounded-lg overflow-hidden">
            <thead className="bg-purple-800/20 text-left text-purple-300">
              <tr>
                <th className="p-4">Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-purple-900/10 border-b border-white/10"
                >
                  <td className="p-4">{user.empid}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => setSelectedUserId(user._id)}
                      className="text-purple-400 hover:underline"
                    >
                      Update Password
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Password Form */}
      {selectedUserId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-white/5 p-6 rounded-xl shadow-xl max-w-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-300">
            Set New Password
          </h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => setSelectedUserId(null)}
              className="px-4 py-2 bg-slate-600 rounded hover:bg-slate-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 transition"
            >
              Save
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
