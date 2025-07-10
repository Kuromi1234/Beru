import { FaTachometerAlt, FaLaptop, FaUsers, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
  { to: "/admin/assets", icon: <FaLaptop />, label: "All Assets" },
  { to: "/admin/users", icon: <FaUsers />, label: "All Users" },
  { to: "/admin/add-user", icon: <FaUserPlus />, label: "Add User" },
  { to: "/admin/reset-user-password", icon: <FaUserCircle />, label: "Reset User Password" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-full min-h-screen hidden md:flex flex-col justify-between bg-white/10  border-r border-white/10 shadow-xl z-10">
      {/* Top Logo and Navigation */}
      <div>
        <div className="text-3xl font-bold px-6 py-5 text-white tracking-wider">
          <span className="text-purple-400">BERU</span>Admin
        </div>
        <nav className="flex flex-col gap-2 px-4 mt-4">
          {links.map(({ to, icon, label }) => (
            <NavLink
              to={to}
              key={label}
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

      {/* Bottom Logged-in Info */}
      <div className="p-4">
        <div className="bg-black/30 text-white rounded-lg px-4 py-3 flex items-center gap-3">
          <FaUserCircle size={28} className="text-purple-300" />
          <div>
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold">admin@beru.ai</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
