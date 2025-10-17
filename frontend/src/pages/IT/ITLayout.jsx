import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../components/sidebarIT";
import Topbar from "../../components/TopbarIT";


export default function ITLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("beru-user")) || { name: "IT User" };

  const shouldShowWelcome =
    location.pathname === "/it" || location.pathname === "/it/";

  useEffect(() => {
    // Optional guard for unauthenticated users
    if (!user) navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("beru-user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-darkNavy to-black text-white relative overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl animate-pulse z-0"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-400/20 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed md:static z-40 w-64 h-screen transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar
          role="it"
          closeSidebar={() => setSidebarOpen(false)}
          footerText={`Logged in as: ${user.name}`}
        />
      </motion.div>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar
          role="it"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          {shouldShowWelcome && (
            <motion.h1
              className="text-center text-4xl md:text-5xl font-bold tracking-tight my-10 text-teal-300"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome, IT Commander
              <span className="text-cyan-400 block mt-2">Manage the Matrix</span>
            </motion.h1>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
