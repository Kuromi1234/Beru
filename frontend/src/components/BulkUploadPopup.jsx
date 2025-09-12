// src/components/BulkUploadPopup.jsx
import { motion, AnimatePresence } from "framer-motion";

const BulkUploadPopup = ({ item, open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            exit={{ rotateY: 90, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative bg-gradient-to-br from-black/95 to-gray-900/95 text-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] w-full max-w-md sm:max-w-lg border border-white/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bulk Upload Report
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-green-400">
                  {item?.details?.totalUploaded ?? 0}
                </p>
                <p className="text-xs text-white/70 mt-1">Uploaded</p>
              </div>
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-red-400">
                  {item?.details?.totalSkipped ?? 0}
                </p>
                <p className="text-xs text-white/70 mt-1">Skipped</p>
              </div>
            </div>

            {/* Brand breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2 text-purple-300">
                📦 By Brand
              </h4>
              <div className="bg-white/5 rounded-lg border border-white/10 p-3 max-h-28 overflow-auto">
                {Object.keys(item?.details?.brandCounts || {}).length === 0 ? (
                  <p className="text-xs text-white/50">No brand data</p>
                ) : (
                  <ul className="text-xs space-y-1">
                    {Object.entries(item.details.brandCounts).map(
                      ([brand, count]) => (
                        <li
                          key={brand}
                          className="flex justify-between border-b border-white/5 last:border-0 pb-1"
                        >
                          <span className="capitalize">{brand}</span>
                          <span className="text-purple-300">{count}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Type breakdown */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-blue-300">
                🛠 By Type
              </h4>
              <div className="bg-white/5 rounded-lg border border-white/10 p-3 max-h-28 overflow-auto">
                {Object.keys(item?.details?.assetTypeCounts || {}).length ===
                0 ? (
                  <p className="text-xs text-white/50">No type data</p>
                ) : (
                  <ul className="text-xs space-y-1">
                    {Object.entries(item.details.assetTypeCounts).map(
                      ([type, count]) => (
                        <li
                          key={type}
                          className="flex justify-between border-b border-white/5 last:border-0 pb-1"
                        >
                          <span className="capitalize">{type}</span>
                          <span className="text-blue-300">{count}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulkUploadPopup;
