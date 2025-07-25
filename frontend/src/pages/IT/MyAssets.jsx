import { useEffect, useState } from "react";
import AssignAssetModal from "../../components/AssignAsset";
import axios from "axios";
import AssignedUserDetailsModal from "../../components/AssignUserDetailsModal";
import {
  FaSearch,
  FaFileDownload,
  FaTrashAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;
const API_BASE_URL = "http://localhost:5000/api/assets";

export default function MyAssets() {
  const [assets, setAssets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    serialNumber: "",
    model: "",
    assetType: "",
    status: "in_stock",
  });
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssetForAssign, setSelectedAssetForAssign] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const statusOptions = [
    "in_stock",
    "assigned",
    "damaged",
    "repair",
    "discarded",
    "to_be_retrieved",
    "retrieved",
  ];

  const assetTypes = [
    "laptop",
    "desktop",
    "monitor",
    "phone",
    "tablet",
    "peripheral",
    "other",
  ];

  useEffect(() => {
    fetchAssets();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/getall`,
        getAuthHeaders()
      );
      setAssets(response.data);
      setFiltered(response.data);

      toast.success("✅ Assets loaded successfully");
    } catch (err) {
      console.error("Fetch assets error:", err);
      toast.error("❌ Failed to fetch assets");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredData = assets.filter(
      (a) =>
        a.name.toLowerCase().includes(value) ||
        a.serialNumber.toLowerCase().includes(value) ||
        a.model.toLowerCase().includes(value) ||
        a.assetType.toLowerCase().includes(value) ||
        a.status.toLowerCase().includes(value)
    );
    setFiltered(filteredData);
    setPage(1);
  };

  const exportToCSV = () => {
    const csv = [
      ["Name", "Serial", "Model", "Type", "Status"],
      ...filtered.map((a) => [
        a.name,
        a.serialNumber,
        a.model,
        a.assetType,
        a.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "assets.csv";
    a.click();
    toast.success("📥 CSV exported successfully");
  };

  const handleEdit = (asset) => {
    setEditingId(asset._id);
    setEditForm({ ...asset });
  };

  const handleSave = async (id) => {
    try {
      setLoading(true);

      const updateData = {
        _id: id,
        name: editForm.name,
        serialNumber: editForm.serialNumber,
        model: editForm.model,
        assetType: editForm.assetType,
        status: editForm.status,
      };
      console.log("Token headers being sent:", getAuthHeaders());

      await axios.put(
        `${API_BASE_URL}/update`,
        {
          assetId: asset._id,
          status: selectedStatus,
          remarks: remarks || "", // optional
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditingId(null);
      setEditForm({});

      toast.success("✅ Asset updated successfully");
    } catch (err) {
      console.error("Update asset error:", err);
      toast.error("❌ Failed to update asset");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/delete/${id}`, getAuthHeaders());

      toast.success("✅ Asset deleted successfully");
    } catch (err) {
      console.error("Delete asset error:", err);
      toast.error("❌ Failed to delete asset");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const asset = assets.find((a) => a._id === id);

    if (newStatus === "assigned") {
      setSelectedAssetForAssign(asset);
      setShowAssignModal(true);
      return;
    }

    if (
      ["in_stock", "damaged", "repair", "discarded", "retrieved"].includes(
        newStatus
      )
    ) {
      await axios.put(
        `${API_BASE_URL}/update`,
        {
          assetID: id,
          assetStatus: newStatus,
          assignedTo: null,
        },
        getAuthHeaders()
      );

      if (newStatus === "retrieved") {
        setTimeout(async () => {
          await axios.put(
            `${API_BASE_URL}/update`,
            {
              assetID: id,
              assetStatus: "in_stock",
              assignedTo: null,
            },
            getAuthHeaders()
          );
          await fetchAssets();
        }, 24 * 60 * 60 * 1000); // 24 hours in ms
      }

      toast.success(`✅ Status changed to ${newStatus}`);
    }
  };

  const handleAssign = async (assetId, userDetails) => {
    try {
      await axios.put(
        `${API_BASE_URL}/assign`,
        {
          assetID: assetId,
          assetStatus: "assigned",
          assignedTo: userDetails,
        },
        getAuthHeaders()
      );

      toast.success("✅ Asset assigned successfully");
      setShowAssignModal(false);
      setSelectedAssetForAssign(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to assign asset");
    }
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentAssets = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const StatusBadge = ({
    status,
    isEditing = false,
    onChange = null,
    assetId = null,
  }) => {
    const colorMap = {
      in_stock: "bg-green-600/20 text-green-300",
      assigned: "bg-blue-600/20 text-blue-300",
      damaged: "bg-red-600/20 text-red-300",
      repair: "bg-yellow-500/20 text-yellow-300",
      discarded: "bg-gray-500/20 text-gray-300",
      to_be_retrieved: "bg-orange-600/20 text-orange-300",
      retrieved: "bg-purple-600/20 text-purple-300",
    };

    if (isEditing) {
      return (
        <select
          value={status}
          onChange={onChange}
          className="bg-black/30 text-white px-2 py-1 rounded-md text-xs border border-white/20 focus:ring-1 focus:ring-purple-500 outline-none"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option} className="bg-gray-800">
              {option.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            colorMap[status] || "bg-white/20 text-white"
          }`}
        >
          {status.replace(/_/g, " ")}
        </span>
        {/* Quick status change dropdown */}
        <select
          value={status}
          onChange={(e) => handleStatusChange(assetId, e.target.value)}
          className="bg-transparent text-xs border-none outline-none cursor-pointer hover:bg-white/10 rounded p-1 text-white/70"
          title="Quick status change"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option} className="bg-gray-800">
              {option.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
   
      <section className="max-w-7xl mx-auto px-4 py-10">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            MY ASSETS
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={exportToCSV}
              className="bg-purple-500/30 hover:bg-purple-500/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <FaFileDownload /> Export CSV
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 rounded-xl bg-black/20 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200"
            />
            <FaSearch className="absolute left-3 top-3 text-white/50" />
          </div>
        </div>

        {/* Assets Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white/10 backdrop-blur p-4 border border-white/10">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <p className="text-white/70 mt-2">Loading...</p>
            </div>
          )}

          <table className="w-full text-left table-auto text-white text-sm">
            <thead>
              <tr className="text-purple-300 border-b border-white/10">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 hidden sm:table-cell">Serial No</th>
                <th className="py-3 px-4 hidden md:table-cell">Model</th>
                <th className="py-3 px-4 hidden lg:table-cell">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((asset, i) => (
                <motion.tr
                  key={asset._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-white/5 border-b border-white/10 transition-all duration-200"
                >
                  <td className="py-3 px-4">
                    {editingId === asset._id ? (
                      <input
                        type="text"
                        value={editForm.name || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full bg-black/30 text-white px-2 py-1 rounded border border-white/20 focus:ring-1 focus:ring-purple-500 outline-none"
                      />
                    ) : asset.status === "assigned" ? (
                      <div
                        className="font-medium underline decoration-dotted decoration-purple-400 cursor-pointer hover:text-purple-300 transition"
                        onClick={() => {
                          setSelectedUserDetails(asset.assignedTo);
                          setShowUserModal(true);
                        }}
                      >
                        {asset.name}
                      </div>
                    ) : (
                      <div className="font-medium">{asset.name}</div>
                    )}

                    {/* Mobile View */}
                    <div className="sm:hidden text-xs text-white/60 mt-1">
                      {asset.serialNumber} • {asset.model} • {asset.assetType}
                    </div>
                  </td>

                  <td className="py-3 px-4 hidden sm:table-cell">
                    {editingId === asset._id ? (
                      <input
                        type="text"
                        value={editForm.serialNumber || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            serialNumber: e.target.value,
                          })
                        }
                        className="w-full bg-black/30 text-white px-2 py-1 rounded border border-white/20 focus:ring-1 focus:ring-purple-500 outline-none"
                      />
                    ) : (
                      asset.serialNumber
                    )}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {editingId === asset._id ? (
                      <input
                        type="text"
                        value={editForm.model || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, model: e.target.value })
                        }
                        className="w-full bg-black/30 text-white px-2 py-1 rounded border border-white/20 focus:ring-1 focus:ring-purple-500 outline-none"
                      />
                    ) : (
                      asset.model
                    )}
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    {editingId === asset._id ? (
                      <select
                        value={editForm.assetType || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            assetType: e.target.value,
                          })
                        }
                        className="bg-black/30 text-white px-2 py-1 rounded border border-white/20 focus:ring-1 focus:ring-purple-500 outline-none"
                      >
                        {assetTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-gray-800 capitalize"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="capitalize">{asset.assetType}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === asset._id ? (
                      <StatusBadge
                        status={editForm.status || asset.status}
                        isEditing={true}
                        onChange={(e) =>
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                      />
                    ) : (
                      <StatusBadge status={asset.status} assetId={asset._id} />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {editingId === asset._id ? (
                        <>
                          <button
                            onClick={() => handleSave(asset._id)}
                            disabled={loading}
                            className="text-green-400 hover:text-green-300 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                            title="Save changes"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditForm({});
                            }}
                            className="text-gray-400 hover:text-gray-300 transition-all duration-200 transform hover:scale-110"
                            title="Cancel editing"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(asset)}
                            className="text-blue-400 hover:text-blue-300 transition-all duration-200 transform hover:scale-110"
                            title="Edit asset"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(asset._id)}
                            disabled={loading}
                            className="text-red-400 hover:text-red-300 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                            title="Delete asset"
                          >
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {currentAssets.length === 0 && !loading && (
            <div className="text-center py-12 text-white/70">
              <div className="text-4xl mb-4">📦</div>
              <p className="text-lg">No assets found</p>
              {search && (
                <p className="text-sm mt-2">Try a different search term</p>
              )}
            </div>
          )}
        </div>
        {showUserModal && selectedUserDetails && (
          <AssignedUserDetailsModal
            isOpen={showUserModal}
            onClose={() => setShowUserModal(false)}
            user={selectedUserDetails}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => setPage(i + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  page === i + 1
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-purple-500/20"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        )}
        {showAssignModal && selectedAssetForAssign && (
          <AssignAssetModal
            asset={selectedAssetForAssign}
            onClose={() => {
              setShowAssignModal(false);
              setSelectedAssetForAssign(null);
            }}
            onAssign={handleAssign}
          />
        )}
      </section>
  );
}
