
import { motion } from "framer-motion";

const GlassCard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 w-full max-w-md"
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
