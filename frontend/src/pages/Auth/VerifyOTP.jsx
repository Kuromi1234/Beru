// src/pages/auth/VerifyOtp.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../../utils/api";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("OTP must be 6 digits 😬");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP(email, otp);
      toast.success(res.data.message || "OTP verified! 🔓");
      navigate("/ResetPassword", { state: { email, token: otp } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP 😵");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-800 flex items-center justify-center px-4 sm:px-6">
      {/* Mobile-friendly glowing backgrounds */}
      <div className="absolute -top-20 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-500/20 rounded-full blur-2xl animate-pulse z-0" />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Verify OTP 🔍</h2>
        <p className="text-sm sm:text-base text-white mb-6">
          Enter the magic 6-digit code from your inbox 📩
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 text-center tracking-widest text-lg sm:text-xl"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify OTP ✅"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
