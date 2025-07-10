import { motion } from "framer-motion";
import { FaSignOutAlt, FaBars } from "react-icons/fa";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-white/5 border-b border-white/10 shadow-sm z-10">

      {/* Left Side - Hamburger + Title */}
      <div className="flex items-center gap-4">
        {/* Hamburger Icon (Mobile only) */}
        <motion.button
          onClick={onMenuClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-purple-400 hover:text-purple-300 transition"
        >
          <FaBars size={24} />
        </motion.button>

        {/* Animated Page Title */}
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold text-white"
        >
          Welcome, Admin <span className="ml-1">👑</span>
        </motion.h1>
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        <FaSignOutAlt />
        Logout
      </motion.button>
    </header>
  );
}
