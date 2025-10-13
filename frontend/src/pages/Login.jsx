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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user, message } = res.data;

      // Save token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      login(user); // Update context

      toast.success(message || "✅ Logged in successfully!");

      // Role-based routing
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "IT") {
        navigate("/it/dashboard");
      } else {
        toast.error("❌ Unauthorized role!");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(`❌ ${msg}`);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row  text-white bg-gradient-to-b from-[#0c0a22] via-[#0e003a] to-[#020005] z-0">
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 relative overflow-hidden z-11">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-md z-10"
        >
          <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-md">
            Welcome Back to <span className="text-purple-400">BERU</span>
          </h1>
          <p className="mt-6 text-slate-300 max-w-sm">
            Login to access your IT asset dashboard and manage smarter.
          </p>
        </motion.div>

        {/* BACKGROUND GLOW */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
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
