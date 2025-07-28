import { motion } from "framer-motion";

const ProfileHeader = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8 p-6 rounded-2xl shadow-xl bg-gradient-to-r from-purple-700/30 via-indigo-700/30 to-blue-900/30 backdrop-blur-lg border border-white/10 text-white"
    >
      <h2 className="text-2xl font-bold mb-1">👤 {user?.name}</h2>
      <p className="text-white/70">{user?.email}</p>
      <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10">
        Role: {user?.role || "User"}
      </span>
    </motion.div>
  );
};

export default ProfileHeader;
