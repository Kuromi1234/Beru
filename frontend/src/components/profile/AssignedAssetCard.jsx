import { motion } from "framer-motion";

const AssignedAssetCard = ({ asset }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-indigo-800/40 to-blue-900/30 p-4 rounded-xl border border-white/10 shadow-md backdrop-blur-md transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-purple-300 mb-1">{asset.name}</h3>
      <p className="text-white/80 text-sm">Type: {asset.assetType}</p>
      <p className="text-white/60 text-xs mt-1">Status: {asset.status}</p>
      {asset.assignedDate && (
        <p className="text-white/50 text-xs mt-1">Assigned: {new Date(asset.assignedDate).toLocaleDateString()}</p>
      )}
    </motion.div>
  );
};

export default AssignedAssetCard;
