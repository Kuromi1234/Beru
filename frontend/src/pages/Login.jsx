import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      const { token, user } = res.data;

      toast.success(res.data.message || "Logged in successfully!");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Route based on user role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "IT") {
        navigate("/it/dashboard"); // Redirect to IT dashboard
      } else {
        toast.error("❌ Unauthorized role!");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(`❌ ${msg}`);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-darkNavy via-secondary to-black text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Visual */}
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
            Welcome Back to <span className="text-purple-400">BERU</span>
          </h1>
          <p className="mt-6 text-slate-300 max-w-sm relative z-10">
            Login to access your IT asset dashboard and manage smarter.
          </p>
        </motion.div>
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 z-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@beru.ai"
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex justify-end py-2">
            <Link
              to="/forgotPassword"
              className="text-sm text-purple-400 hover:underline transition duration-150"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full py-3 bg-purple-500/30 text-white font-semibold rounded-xl backdrop-blur-xl hover:bg-purple-500/50 transition-all duration-300"
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
