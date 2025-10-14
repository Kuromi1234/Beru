import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import PasswordField from "../components/PasswordField";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user, message } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      login(user);

      toast.success(message || "✅ Logged in successfully!");

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "IT") navigate("/it/dashboard");
      else toast.error("❌ Unauthorized role!");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(`❌ ${msg}`);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row text-white bg-gradient-to-b from-[#0c0a22] via-[#0e003a] to-[#020005] overflow-hidden">
      {/* Floating Glow Backgrounds */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-[100px] rounded-full" />

      {/* Left Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-6 sm:px-10 py-16 md:py-0 text-center md:text-left relative z-10">
        <header className="fixed sm:scroll  top-0 left-0 w-full z-[999] bg-transparent py-4">
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
            Welcome Back to{" "}
            <span className="text-purple-400">BERU</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Login to access your IT asset dashboard and manage smarter.
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
            Login
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@beru.ai"
              required
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
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

          <div className="flex justify-end mb-4">
            <Link
              to="/ForgotPassword"
              className="text-sm text-purple-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600/70 to-indigo-600/70 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md"
          >
            Sign In
          </motion.button>

          <p className="text-center text-slate-400 text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-300 underline">
              Register
            </Link>
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default Login;
