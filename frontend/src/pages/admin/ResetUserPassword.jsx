import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaLock, FaArrowLeft } from "react-icons/fa";

export default function ResetUserPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const userEmail = location.state?.userEmail;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/admin/adminpsswd/${userId}`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password");
    }
  };

  return (
    <section className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white/5 backdrop-blur rounded-xl border border-white/10 shadow-md">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <FaLock /> Reset Password
        </h2>
        <p className="text-white/70 text-sm mb-6">
          You're resetting password for:{" "}
          <span className="text-purple-300 font-semibold">{userEmail}</span>
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm text-white mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 rounded-lg font-semibold"
          >
            Reset Password
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-2 text-sm text-white/60 hover:text-white flex items-center justify-center gap-2"
          >
            <FaArrowLeft />
            Cancel & Go Back
          </button>
        </form>
      </motion.div>
    </section>
  );
}
 