import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/apiConfig";


export default function AddUser() {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    department: "IT",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/api/auth/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ User added successfully!");
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        password: "",
        department: "IT",
      });

      await new Promise((res) => setTimeout(res, 100));
      navigate("/admin/users");
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-xl mx-auto text-white z-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Add New IT User</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-md space-y-5"
      >
        <div>
          <label className="block text-sm mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            placeholder="EMP001"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@beru.ai"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            readOnly
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-gray-400 cursor-not-allowed"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Add User
        </motion.button>
      </form>
    </motion.section>
  );
}
