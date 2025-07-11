import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLaptop, FaRegClipboard, FaUserCheck } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 12,
    assets: 40,
    assigned: 28,
    unassigned: 12,
  });

  const recentAssignments = [
    { empid: "0101023", name: "Adrian", asset: "Dell latitude 5420", date: "2025-07-07" },
    { empid: "0101024", name: "Srimanth", asset: "HP Monitor", date: "2025-07-06" },
    { empid: "0101025", name: "Ashok", asset: "Lenovo Thinkpad", date: "2025-07-05" },
  ];

  const assetPieData = {
    labels: ["Laptops", "Monitors"],
    datasets: [
      {
        data: [26, 14],
        backgroundColor: ["#9333ea", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  const activityBarData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Assignments",
        data: [4, 6, 3, 5, 7],
        backgroundColor: "#8b5cf6",
      },
    ],
  };

  return (
    <div className="space-y-12 scroll-smooth">
      <DashboardHeader />
      <StatCards stats={stats} />
      <Charts assetPieData={assetPieData} activityBarData={activityBarData} />
      <RecentAssignments assignments={recentAssignments} />
    </div>
  );
}

const DashboardHeader = () => (
  <motion.div
    className="relative text-center"
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
      Welcome to the <span className="text-purple-400 drop-shadow-md">BERU Admin Dashboard</span>
    </h1>
    <p className="mt-2 text-slate-400">Manage your users and IT assets effortlessly 🚀</p>
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-md animate-pulse -z-10" />
  </motion.div>
);

const StatCards = ({ stats }) => {
  const cards = [
    { icon: <FaUsers />, label: "Total Users", value: stats.users },
    { icon: <FaLaptop />, label: "Total Assets", value: stats.assets },
    { icon: <FaUserCheck />, label: "Assigned", value: stats.assigned },
    { icon: <FaRegClipboard />, label: "Unassigned", value: stats.unassigned },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          className="bg-white/5 rounded-xl p-6 shadow-lg border border-white/10 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx }}
        >
          <div className="text-purple-300 text-3xl mb-2">{card.icon}</div>
          <div className="text-lg font-semibold text-slate-200">{card.label}</div>
          <div className="text-2xl font-bold text-white">{card.value}</div>
        </motion.div>
      ))}
    </div>
  );
};

const Charts = ({ assetPieData, activityBarData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        className="bg-white/5 p-6 rounded-xl shadow-md border border-white/10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-white text-xl font-semibold mb-4">Asset Distribution</h3>
        <Doughnut data={assetPieData} />
      </motion.div>

      <motion.div
        className="bg-white/5 p-6 rounded-xl shadow-md border border-white/10"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-white text-xl font-semibold mb-4">Assignments This Week</h3>
        <Bar data={activityBarData} />
      </motion.div>
    </div>
  );
};

const RecentAssignments = ({ assignments }) => (
  <motion.div
    className="bg-white/5 p-6 rounded-xl shadow-md border border-white/10"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-white text-xl font-semibold mb-4">Recent Assignments</h3>
    <ul className="divide-y divide-white/10">
      {assignments.map((item, idx) => (
        <li key={idx} className="py-3 flex justify-between text-sm text-slate-300">
          <span>
            <strong>{item.name}</strong> ({item.empid}) assigned <em>{item.asset}</em>
          </span>
          <span>{item.date}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);