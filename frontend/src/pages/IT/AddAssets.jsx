import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import CustomStatusDropdown from "../../components/CustomStatusDropdown";

const API_BASE_URL = "http://localhost:5000/api/assets";

const AddAssetPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    assetType: "",
    serialNumber: "",
    model: "",
    status: "in_stock",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/add`,
        formData,
        getAuthHeaders()
      );
      toast.success("✅ Asset added successfully");
      setFormData({
        name: "",
        assetType: "",
        serialNumber: "",
        model: "",
        status: "in_stock",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-2xl glassmorphic-card p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <FaPlusCircle className="text-purple-400 animate-pulse" />
          Add New Asset
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {["name", "assetType", "serialNumber", "model"].map((field) => (
            <div key={field} className="relative">
              <input
                name={field}
                type="text"
                required
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <div className="w-full">
            <label className="block text-sm font-medium text-white mb-2">
              Status
            </label>
            <div className="inline-block rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-400 px-4 py-2 text-sm font-semibold text-white shadow-md ring-1 ring-white/10 backdrop-blur-sm">
              📦 In Stock
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-purple-500 text-black font-semibold py-3 rounded-xl shadow-md hover:bg-purple-600 transition-colors"
          >
            {loading ? "Saving..." : "Add Asset"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAssetPage;
