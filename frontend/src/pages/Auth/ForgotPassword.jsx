// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { requestPasswordReset } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Bruh 😤 enter your email!");
      return;
    }

    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      toast.success(res.data.message || "OTP sent! 🚀");
      navigate("/VerifyOtp", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something broke! 💥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-800 flex items-center justify-center px-4 sm:px-6">
      <div className="absolute -top-20 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-500/20 rounded-full blur-2xl animate-pulse z-0" />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Forgot Password 🔑</h2>
        <p className="text-sm sm:text-base text-white mb-6">No worries, we all forget stuff... even passwords 😅</p>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition text-sm sm:text-base"
          >
            {loading ? "Sending OTP..." : "Send OTP 🚀"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
