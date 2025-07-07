import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="relative z-10">
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {["Total Assets", "Users", "Assigned"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/10 p-6 rounded-xl shadow-xl border border-white/10 backdrop-blur-sm"
          >
            <h4 className="text-lg font-semibold text-purple-300 mb-2">{label}</h4>
            <p className="text-3xl font-bold text-white">--</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
