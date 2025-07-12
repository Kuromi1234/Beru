import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLaptop, FaCheckCircle, FaTimesCircle, FaUsers } from "react-icons/fa";
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

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/assets/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-center text-red-400 mt-20">Failed to load stats.</div>;
  }

  const chartData = {
    labels: ["In Stock", "Assigned", "Damaged", "Repair", "To Be Retrieved", "Retrieved", "Discarded"],
    datasets: [
      {
        label: "Asset Status Overview",
        data: [
          stats.in_stock,
          stats.assigned,
          stats.damaged,
          stats.repair,
          stats.to_be_retrieved,
          stats.retrieved,
          stats.discarded
        ],
        backgroundColor: [
          "#6EE7B7", "#93C5FD", "#FCA5A5", "#FCD34D", "#DDD6FE", "#A7F3D0", "#F9A8D4"
        ],
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Total Assets</h3>
          <p className="text-3xl font-bold flex items-center gap-2">
            <FaLaptop /> {stats.totalAssets}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">In Stock</h3>
          <p className="text-3xl font-bold flex items-center gap-2">
            <FaCheckCircle /> {stats.in_stock}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Assigned</h3>
          <p className="text-3xl font-bold flex items-center gap-2">
            <FaUsers /> {stats.assigned}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Damaged</h3>
          <p className="text-3xl font-bold flex items-center gap-2">
            <FaTimesCircle /> {stats.damaged}
          </p>
        </motion.div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Asset Distribution</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
