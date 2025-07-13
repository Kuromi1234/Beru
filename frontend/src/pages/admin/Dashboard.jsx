import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaLaptop, FaCheckCircle, FaTimesCircle, FaUsers, FaPlusCircle, FaUndo
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/assets/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center text-white mt-20">Loading dashboard...</div>;
  if (!stats) return <div className="text-center text-red-400 mt-20">Failed to load stats.</div>;

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
        "#6EE7B7", "#93C5FD", "#FCA5A5",
        "#FCD34D", "#DDD6FE", "#A7F3D0", "#F9A8D4"
      ],
      borderRadius: 8
    }]
  };

  const StatCard = ({ title, value, icon, gradient }) => (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className={`p-6 ${gradient} text-white rounded-xl shadow-lg transition-all duration-300`}
    >
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold flex items-center gap-2">{icon} {value}</p>
    </motion.div>
  );

  const RecentList = ({ title, data }) => (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl">
      <h4 className="text-white text-lg font-semibold mb-3">{title}</h4>
      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No data available.</p>
      ) : (
        <ul className="text-sm text-gray-300 space-y-2">
          {data.map((asset, idx) => (
            <li key={idx} className="flex flex-col bg-black/20 p-2 rounded-md">
              <span className="text-purple-300 font-medium">{asset.name} ({asset.assetType})</span>
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Assets" value={stats.totalAssets} icon={<FaLaptop />} gradient="bg-gradient-to-br from-purple-600 to-indigo-600" />
        <StatCard title="In Stock" value={stats.in_stock} icon={<FaCheckCircle />} gradient="bg-gradient-to-br from-green-500 to-emerald-600" />
        <StatCard title="Assigned" value={stats.assigned} icon={<FaUsers />} gradient="bg-gradient-to-br from-yellow-400 to-orange-500" />
        <StatCard title="Damaged" value={stats.damaged} icon={<FaTimesCircle />} gradient="bg-gradient-to-br from-red-500 to-rose-600" />
      </div>

      {/* More stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total IT Users" value={stats.totalUsers} icon={<FaUsers />} gradient="bg-gradient-to-br from-cyan-500 to-blue-500" />
        <StatCard title="Assigned to Users" value={stats.totalAssignedAssets} icon={<FaCheckCircle />} gradient="bg-gradient-to-br from-pink-500 to-fuchsia-600" />
      </div>

      {/* Chart */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 mb-12 shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Asset Distribution Overview</h2>
        <Bar data={chartData} />
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentList title="Recently Added Assets" data={stats.recentAdded} />
        <RecentList title="Recently Assigned Assets" data={stats.recentAssigned} />
        <RecentList title="Recently Retrieved Assets" data={stats.recentRetrieved} />
      </div>
    </div>
  );
};

export default Dashboard;
