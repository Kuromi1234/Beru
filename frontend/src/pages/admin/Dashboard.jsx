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

//dashboard component structure

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 12,
    assets: 40,
    assigned: 28,
    unassigned: 12,
  });

  const recentAssignments = [
    { empid: "IT1023", name: "Aman Raj", asset: "Dell Laptop", date: "2025-07-07" },
    { empid: "IT1024", name: "Sneha Kumari", asset: "HP Monitor", date: "2025-07-06" },
    { empid: "IT1025", name: "Ritik Sinha", asset: "MacBook Air", date: "2025-07-05" },
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
    <div className="space-y-12">
      <DashboardHeader />
      <StatCards stats={stats} />
      <Charts assetPieData={assetPieData} activityBarData={activityBarData} />
      <RecentAssignments assignments={recentAssignments} />
    </div>
  );
}
//dashboard header component

const DashboardHeader = () => (
  <motion.div
    className="relative text-center"
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
      Welcome to the{" "}
      <span className="text-purple-400 drop-shadow-md">BERU Admin Dashboard</span>
    </h1>
    <p className="mt-2 text-slate-400">Manage your users and IT assets effortlessly 🚀</p>

    {/* Animated blob */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse -z-10" />
  </motion.div>
);

//stat cards component

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
          className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-md border border-white/10 flex flex-col items-center text-center"
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

//charts component
const Charts = ({ assetPieData, activityBarData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        className="bg-white/10 p-6 rounded-xl shadow-md border border-white/10"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-white text-xl font-semibold mb-4">Asset Distribution</h3>
        <Doughnut data={assetPieData} />
      </motion.div>

      <motion.div
        className="bg-white/10 p-6 rounded-xl shadow-md border border-white/10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-white text-xl font-semibold mb-4">Assignments This Week</h3>
        <Bar data={activityBarData} />
      </motion.div>
    </div>
  );
};

//recent assignments component

const RecentAssignments = ({ assignments }) => (
  <motion.div
    className="bg-white/10 p-6 rounded-xl shadow-md border border-white/10"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
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

