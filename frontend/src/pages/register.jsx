import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import PasswordField from "../components/PasswordField";
import BASE_URL from "../utils/apiConfig";

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
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, formData);
      toast.success("✅ Registered!", {
        style: { background: "#1f2937", color: "#fff", zIndex: 9999 },
      });
      await new Promise((res) => setTimeout(res, 100));
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-b from-[#0c0a22] via-[#0e003a] to-[#020005] text-white overflow-hidden">
      {/* Floating Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-[100px] rounded-full" />

      {/* Left Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-6 sm:px-10 py-16 md:py-0 text-center md:text-left relative z-10">
        <header className="static lg:fixed top-0 left-0 w-full z-[999] bg-transparent py-4">
          <div className="max-w-7xl mx-auto px-6 flex justify-center md:justify-start">
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-widest text-white hover:text-purple-400 transition"
            >
              BERU
            </Link>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-md space-y-5 mt-20 md:mt-0"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-md">
            Empower Your IT{" "}
            <span className="text-purple-400">Workflow</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Create your account and start managing assets like a pro with{" "}
            <span className="font-semibold text-purple-300">BERU</span>.
          </p>
        </motion.div>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-6 sm:px-8 py-12 md:py-0 z-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Register
          </h2>

          {/* Employee ID */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Employee ID
            </label>
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

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Name
            </label>
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

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Email
            </label>
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

          {/* Password */}
          <PasswordField
            id="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Department */}
          <div className="mb-6">
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Department
            </label>
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

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600/70 to-indigo-600/70 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md"
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
