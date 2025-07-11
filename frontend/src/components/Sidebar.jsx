import {
  FaTachometerAlt,
  FaLaptop,
  FaUsers,
  FaUserPlus,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
  { to: "/admin/assets", icon: <FaLaptop />, label: "All Assets" },
  { to: "/admin/users", icon: <FaUsers />, label: "All Users" },
  { to: "/admin/add-user", icon: <FaUserPlus />, label: "Add User" },
  { to: "/admin/reset-user-password", icon: <FaUserCircle />, label: "Reset Password" },
];
const user = JSON.parse(localStorage.getItem("user"));
const email = user?.email || "admin@beru.ai";

export default function Sidebar({ closeSidebar }) {
  return (
    <aside className="h-screen w-64 flex flex-col justify-between bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-2xl text-white">
      <div>
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-4 md:hidden">
          <span className="text-2xl font-bold text-purple-400">BERU Admin</span>
          <button onClick={closeSidebar} className="text-white hover:text-purple-300 transition">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:block text-3xl font-bold px-6 py-5 tracking-wider">
          <span className="text-purple-400">BERU</span>Admin
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 px-4 mt-4">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-purple-500/30 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-purple-300"
                }`
              }
            >
              {icon} <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom User Info */}
      <div className="p-4">
        <div className="bg-black/30 text-white rounded-lg px-4 py-3 flex items-center gap-3">
          <FaUserCircle size={28} className="text-purple-300" />
          <div>
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold">{email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
