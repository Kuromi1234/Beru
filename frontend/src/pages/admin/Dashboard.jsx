import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaLaptop,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaUndo 
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import BASE_URL from "../../utils/apiConfig";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    in_stock: 0,
    assigned: 0,
    damaged: 0,
    repair: 0,
    to_be_retrieved: 0,
    retrieved: 0,
    discarded: 0,
    totalAssets: 0,
    totalUsers: 0,
    totalAssignedAssets: 0,
    recentAdded: [],
    recentAssigned: [],
    recentRetrieved: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/assets/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err.message);
      }
    };

    fetchStats();
  }, []);

  const chartData = {
    labels: ["In Stock", "Assigned", "Damaged", "Repair", "To Be Retrieved", "Retrieved", "Discarded"],
    datasets: [{
      label: "Asset Status",
      data: [
        stats.in_stock, stats.assigned, stats.damaged,
        stats.repair, stats.to_be_retrieved,
        stats.retrieved, stats.discarded
      ],
      backgroundColor: [
        "#4ADE80", "#60A5FA", "#F87171",
        "#FBBF24", "#C4B5FD", "#34D399", "#F472B6"
      ],
      borderRadius: 6,
      barThickness: 30
    }]
  };

  const StatCard = ({ title, value, icon, fromColor, toColor }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-6 bg-gradient-to-br from-${fromColor} to-${toColor} 
        rounded-xl text-white shadow-xl 
        transition-all duration-300 border border-white/10`}
      style={{
        background: 'linear-gradient(135deg, #4c1d95, #6b21a8)',
        boxShadow: "0 8px 24px rgba(255, 255, 255, 0.05)",
        transform: "translateZ(0)"
      }}
    >
      <h3 className="text-md font-semibold mb-2 text-white/80">{title}</h3>
      <p className="text-3xl font-bold flex items-center gap-2">{icon} {value ?? 0}</p>
    </motion.div>
  );

  const RecentList = ({ title, data }) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-inner">
      <h4 className="text-white text-md font-semibold mb-3">{title}</h4>
      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No records found.</p>
      ) : (
        <ul className="text-sm text-gray-300 space-y-2">
          {data.map((asset, idx) => (
            <li key={idx} className="flex flex-col bg-black/30 p-3 rounded-md shadow-sm hover:bg-black/40">
              <span className="text-purple-300 font-medium">
                {asset.name} ({asset.assetType})
              </span>
              {asset.assignedTo && (
                <span className="text-xs text-gray-400">
                  Assigned to: {asset.assignedTo.name} ({asset.assignedTo.email})
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Assets" value={stats.totalAssets} icon={<FaLaptop />} fromColor="purple-700/60" toColor="indigo-600/60" />
        <StatCard title="In Stock" value={stats.in_stock} icon={<FaCheckCircle />} fromColor="green-600/50" toColor="emerald-600/50" />
        <StatCard title="Assigned" value={stats.assigned} icon={<FaUsers />} fromColor="yellow-500/40" toColor="orange-500/50" />
        <StatCard title="Damaged" value={stats.damaged} icon={<FaTimesCircle />} fromColor="rose-500/40" toColor="red-600/50" />
      </div>

      {/* Mid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total IT Users" value={stats.totalUsers} icon={<FaUsers />} fromColor="blue-700/50" toColor="cyan-500/50" />
        <StatCard title="Assigned to Users" value={stats.totalAssignedAssets} icon={<FaCheckCircle />} fromColor="pink-600/50" toColor="fuchsia-600/50" />
        <StatCard title="Retrieved Assets" value={stats.retrieved} icon={<FaUndo />} fromColor="gray-600/50" toColor="gray-400/50" />
      </div>

      {/* Bar Chart */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 mb-12 shadow-md ">
        <h2 className="text-xl font-semibold text-white mb-4">📊 Asset Distribution Overview</h2>
        <Bar data={chartData} options={{ plugins: { legend: { labels: { color: "white" } } } }} />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentList title="🆕 Recently Added Assets" data={stats.recentAdded} />
        <RecentList title="✅ Recently Assigned" data={stats.recentAssigned} />
        <RecentList title="🔁 Recently Retrieved" data={stats.recentRetrieved} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
