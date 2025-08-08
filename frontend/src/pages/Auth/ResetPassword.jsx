// src/pages/auth/ResetPassword.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordWithOTP } from "../../utils/api";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const token = location.state?.token;

  const handleReset = async (e) => {
    e.preventDefault();

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must be strong 💪 (8+ chars, A-Z, a-z, 0-9, symbol)"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordWithOTP(email, token, password);
      toast.success(res.data.message || "Password reset! 🎉");
      navigate("/Login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong 😵");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-800 flex items-center justify-center px-4 sm:px-6">
      {/* Background Blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-500/20 rounded-full blur-2xl animate-pulse z-0" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
          Reset Password 🔐
        </h2>
        <p className="text-gray-300 text-sm sm:text-base mb-6 text-center">
          Time to pick a password even Batman can't guess 🦇
        </p>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="New strong password"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg transition font-medium disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password 🔁"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
