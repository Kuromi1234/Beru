import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegPaperPlane } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      localStorage.setItem("resetEmail", email);
      alert("OTP sent to your email");
      navigate("/verifyOTP");
    } catch (err) {
      console.error(err);
      alert("User not found or error sending OTP");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-pink-500/20 rounded-full blur-2xl animate-pulse z-0" />

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/10 dark:bg-slate-800/20 border border-white/20 shadow-2xl px-6 py-10 sm:px-8 sm:py-12 rounded-3xl w-full max-w-md text-white"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-extrabold text-center mb-4"
        >
          Forgot Something?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-300 mb-8 text-sm sm:text-base"
        >
          Happens to the best of us. Enter your email and we’ll send you an OTP
          to bring BERU access back to life. 🔐
        </motion.p>

        <form onSubmit={handleSendOTP} className="space-y-6">
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            type="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 py-3 rounded-xl font-semibold shadow-md transition"
          >
            <FaRegPaperPlane className="text-lg" />
            Send OTP
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-xs sm:text-sm text-center text-slate-400 mt-8"
        >
          If your inbox was a jungle, we just sent in a rescue monkey with the
          OTP 🐒📩
        </motion.p>
      </motion.div>
    </div>
  );
}
