import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Show the Hero heading only if NOT on /admin/dashboard or deeper
  const shouldShowWelcome =
    location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-darkNavy to-black text-white relative overflow-hidden">

      {/* Background Animation Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse z-0" />

      {/* Sidebar (with hamburger logic) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`z-50 fixed md:static w-64 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col z-10 relative">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 md:py-16 text-center overflow-y-auto">

          {/* Conditionally Show Hero Message */}
          {shouldShowWelcome && (
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to your Domain
              <span className="text-purple-400 block mt-2">Mr. Admin</span>
            </motion.h1>
          )}

          
          <Outlet />
        </main>
      </div>
    </div>
  );
}
