import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AssignedUserDetailsModal({ isOpen, onClose, user }) {
  return (
    <AnimatePresence>
      {isOpen && user && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-[#1c1c1e] text-white p-6 rounded-lg w-[90%] max-w-md shadow-xl border border-white/10">
            <div className="text-xl font-semibold text-purple-400 mb-4">
              Assigned User Details
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-white/60">👤 Name:</span> {user.name || "N/A"}
              </div>
              <div>
                <span className="text-white/60">🏢 Department:</span> {user.department || "N/A"}
              </div>
              <div>
                <span className="text-white/60">🆔 Employee ID:</span> {user.employeeId || "N/A"}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded text-white font-medium"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
