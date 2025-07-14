import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaTrashAlt,
  FaRedoAlt,
  FaFileDownload,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userList = res.data.users || res.data;
        if (!Array.isArray(userList)) throw new Error("Users not an array");

        setUsers(userList);
        setFiltered(userList);
      } catch (err) {
        toast.error("❌ Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const results = users.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this user?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ User deleted");
      setUsers(users.filter((u) => u._id !== id));
      setFiltered(filtered.filter((u) => u._id !== id));
    } catch (err) {
      toast.error("❌ Failed to delete user");
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Name", "Email", "Role", "Created At"],
      ...filtered.map((u) => [
        u.name,
        u.email,
        u.role,
        new Date(u.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10">
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">👥 All Users</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-purple-500/30 px-4 py-2 text-white rounded-lg hover:bg-purple-500/60 transition"
        >
          <FaFileDownload />
          Export CSV
        </button>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-end">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-black/20 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-white/50" />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-red-300 text-center">No users found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto rounded-xl shadow-lg bg-white/10 backdrop-blur p-4 border border-white/10"
        >
          <table className="w-full text-left table-auto text-white">
            <thead>
              <tr className="text-purple-300 border-b border-white/10 text-sm">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/5 border-b border-white/10 text-sm"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-600/30 text-purple-300"
                          : user.role === "it"
                          ? "bg-green-600/20 text-green-300"
                          : "bg-blue-600/20 text-blue-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex space-x-3">
                    <button
                      onClick={() =>
                        navigate("/admin/reset-user-password", {
                          state: { userId: user._id, userEmail: user.email },
                        })
                      }
                      className="text-yellow-400 hover:text-yellow-300 transition"
                    >
                      <FaRedoAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </section>
  );
}
