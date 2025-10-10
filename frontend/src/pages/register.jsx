import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {
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

    if (formData.password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      toast.success("✅ Registered!", {
        style: {
          background: "#1f2937",
          color: "#fff",
          zIndex: 9999,
        },
      });

      // ✅ delay so user sees the toast before redirect
      await new Promise((res) => setTimeout(res, 100));
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || " ❌ Registration failed");
    }
  };

  return (
    <section className="relative min-h-screen  text-white flex flex-col md:flex-row overflow-hidden bg-gradient-to-b from-[#0c0a22] via-[#0e003a] to-[#020005] z-0">
      {/* Left Side - Headline Visual */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-md"
        >
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"
            />
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-wide drop-shadow-md relative z-10">
            Empower Your IT <span className="text-purple-400">Workflow</span>
          </h1>
          <p className="mt-6 text-slate-300 max-w-sm relative z-10">
            Create your account and start managing assets like a pro with BERU.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 z-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          {/* Form Fields */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="01010101"
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              readOnly
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1">
              Only IT department users are allowed to register.
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full py-3 bg-purple-500/30 text-white font-semibold rounded-xl backdrop-blur-xl hover:bg-purple-500/50 transition-all duration-300"
          >
            Register Now
          </motion.button>

          <p className="text-center text-slate-400 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-300 underline">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </section>
  );
}
