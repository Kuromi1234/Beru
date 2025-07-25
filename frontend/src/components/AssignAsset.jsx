import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AssignAssetModal({ asset, onClose, onAssign }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    empid: "",
    department: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(asset._id, form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
        className="relative w-[90%] max-w-md p-6 rounded-2xl border border-white/20 shadow-xl bg-white/10 backdrop-blur-md"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-500 transition"
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Assign Asset</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm mb-1 block">Full Name</label>
            <input
              required
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Email Address</label>
            <input
              required
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Employee ID</label>
            <input
              required
              type="text"
              placeholder="Enter employee ID"
              value={form.empid}
              onChange={(e) => setForm({ ...form, empid: e.target.value })}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Department </label>
            <input
              type="text"
              placeholder="E.g., IT, HR"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Assign
          </button>
        </form>
      </motion.div>
    </div>
  );
}
