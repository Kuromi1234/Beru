import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { resetPasswordWithOTP } from "../utils/api"; // your API call helper

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const storedEmail = localStorage.getItem("resetEmail");     // email saved earlier
  const storedOTP = localStorage.getItem("resetToken");       // OTP saved from VerifyOtp
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPasswordWithOTP(storedEmail, storedOTP, password);
      alert("Password reset successful!");

      // Cleanup and redirect
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("OTP invalid or expired");
    }
  };;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Blurred animated blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-yellow-400/20 rounded-full blur-2xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse z-0" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-10 sm:p-12 rounded-3xl w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-sm text-center text-slate-300 mb-8">
          Enter the OTP you received and set your new password 🔐
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          {/* OTP Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </motion.div>

          {/* New Password Field */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 py-3 rounded-xl font-semibold shadow-md transition"
          >
            <FaLock />
            Reset Password
          </motion.button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-6">
          Make it strong, secure, and unguessable... even by AI 🤖
        </p>
      </motion.div>
    </div>
  );
}
