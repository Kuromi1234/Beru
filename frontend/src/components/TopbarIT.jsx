import { motion } from "framer-motion";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { toast } from "react-hot-toast";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "User");
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    toast.success("You have been logged out.");
  };

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-white/5 border-b border-white/10 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <FaBars
          onClick={onMenuClick}
          className="text-purple-300 text-xl cursor-pointer md:hidden"
        />
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold text-white"
        >
          <p className="text-lg font-semibold">
            Welcome,{" "}
            <span className="text-purple-400 font-bold capitalize">
              {userName}
            </span>{" "}
          </p>
        </motion.h1>
      </div>

      <motion.button
        onClick={handleLogout}
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
