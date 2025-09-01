import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Upload, XCircle, CheckCircle, AlertCircle } from "lucide-react";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a file first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/assets/bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage(res.data.message || "✅ Upload successful!");
      setError(null);
      setFile(null);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong while uploading. Try again."
      );
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 gap-8">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 w-full max-w-lg p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Bulk Upload Assets
        </h2>

        {/* Drag & Drop Zone */}
        <div
          className={`relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragging
              ? "border-blue-400 bg-blue-400/10"
              : "border-gray-500 hover:border-blue-400"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />

          {file ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-green-400 mb-2" />
              <p className="text-white">{file.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-300">
              <Upload className="w-12 h-12 mb-2" />
              <p className="text-sm">
                Drag & drop file here or click to select
              </p>
              <p className="text-xs text-gray-400 mt-1">CSV or XLSX only</p>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/50 transition"
          onClick={handleUpload}
        >
          Upload File
        </motion.button>

        {/* Feedback Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-2 text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{message}</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-2 text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Rules Floating Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-80 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl text-white"
      >
        <h3 className="text-xl font-semibold mb-4">📜 Upload Rules</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✅ File format: CSV / XLSX</li>
          <li>✅ Max size: 5MB</li>
          <li>✅ First row must contain column headers</li>
          <li>✅ Columns: Asset Name, Type, Status, AssignedTo</li>
          <li>⚠️ Invalid rows will be skipped</li>
        </ul>
      </motion.div>
    </div>
  );
}
