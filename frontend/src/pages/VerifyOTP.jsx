import { useState } from "react";
import { motion } from "framer-motion";
import { FaUnlockAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    try {
      e.preventDefault();
      localStorage.setItem("resetToken", otp); // store OTP temporarily
      navigate("/ResetPassword");
    } catch (err) {
      console.error(err);
      setError("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-2xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 dark:bg-slate-800/20 border border-white/20 shadow-2xl p-10 sm:p-12 rounded-3xl w-full max-w-md text-white"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center mb-4"
        >
          Verify Your OTP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-300 mb-6 text-sm"
        >
          Enter the code we just sent to your email. It’s your key to unleash
          BERU again! 🔑
        </motion.p>

        <form onSubmit={handleVerify} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <FaUnlockAlt className="text-xl text-purple-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                required
              />
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-500 py-3 rounded-xl font-semibold shadow-md transition"
          >
            Verify OTP
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-center text-slate-400 mt-8"
        >
          Didn’t get it?{" "}
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-yellow-400 hover:underline"
          >
            Resend OTP
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
