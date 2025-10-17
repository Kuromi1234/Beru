import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const shouldShowWelcome =
    location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="flex h-screen bg-gradient-to-br from-darkNavy to-black text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse z-0" />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 w-64 h-screen transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          {shouldShowWelcome && (
            <motion.h1
              className="text-center text-4xl md:text-6xl font-extrabold tracking-tight my-10"
              initial={{ opacity: 0, y: -20 }}
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
