import { useEffect, useState } from "react";
import AssignAssetModal from "../../components/AssignAsset";
import axios from "axios";
import AssignedUserDetailsModal from "../../components/AssignUserDetailsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import BASE_URL from "../../utils/apiConfig";

const ITEMS_PER_PAGE = 10;


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
        `${BASE_URL}/api/assets/getall`,
        getAuthHeaders()
      );
      setAssets(response.data);
      setFiltered(response.data);
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

      const updatedFields = {
        assetID: id,
        updatedFields: {
          name: editForm.name,
          serialNumber: editForm.serialNumber,
          model: editForm.model,
          assetType: editForm.assetType,
          description: editForm.description, // optional
        },
      };

      
      await axios.put(`${BASE_URL}/api/assets/edit`, updatedFields, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      
      setEditingId(null);
      setEditForm({});
      await fetchAssets();
      toast.success("✅ Asset details updated successfully");
    } catch (err) {
      console.error("Error updating asset:", err);
      toast.error("❌ Failed to update asset details");
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
      await axios.delete(`${BASE_URL}/api/assets/delete/${id}`, getAuthHeaders());
      await fetchAssets();

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
      [
        "in_stock",
        "damaged",
        "repair",
        "discarded",
        "retrieved",
        "to_be_retrieved",
      ].includes(newStatus)
    ) {
      try {
        await axios.put(
          `${BASE_URL}/api/assets/update`,
          {
            assetID: id,
            assetStatus: newStatus,
            assignedTo: null,
          },
          getAuthHeaders()
        );

        await fetchAssets();

        if (newStatus === "retrieved") {
          toast.success(
            "✅ Asset marked as retrieved. Will be auto moved to 'in_stock' after 24 hours."
          );
        } else if (newStatus === "to_be_retrieved") {
          toast.success("📦 Asset marked as 'To Be Retrieved'");
        } else {
          toast.success(`✅ Status changed to ${newStatus}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to update status");
      }
    }
  };

  const handleAssign = async (assetId, userDetails) => {
    try {
      const payload = {
        assetID: assetId,
        assetStatus: "assigned",
        assignedTo: {
          employeeId: userDetails.employeeId,
          name: userDetails.name,
          email: userDetails.email,
          department: userDetails.department,
        },
      };

      console.log("📦 Payload to assign:", payload);

      await axios.put(`${BASE_URL}/api/assets/assign`,  getAuthHeaders());

      await fetchAssets();
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
        {/* Status Badge */}
        <span
          className={`px-3 py-1 min-w-[110px] text-center rounded-full text-xs font-semibold shadow-md backdrop-blur-md ${
            colorMap[status] || "bg-white/20 text-white"
          }`}
        >
          {status.replace(/_/g, " ")}
        </span>

        {/* Sexy Dropdown */}
        <div className="relative">
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(assetId, value)}
          >
            <SelectTrigger
              className="min-w-[130px] px-3 py-1 rounded-full text-xs font-medium cursor-pointer
               text-white/80 bg-white/5 border border-white/10 shadow-inner
               hover:bg-white/10 backdrop-blur-md transition-all duration-300 ease-in-out
               focus:ring-2 focus:ring-purple-400 focus:outline-none
               transform hover:scale-105"
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-white/10 rounded-xl shadow-lg">
              {statusOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="text-xs font-medium hover:bg-white/10 cursor-pointer rounded-md py-2"
                >
                  {option.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Custom Arrow */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 transition-transform duration-300 group-open:rotate-180">
            ▼
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">MY ASSETS</h1>
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

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg bg-white/10 backdrop-blur p-4 border border-white/10">
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
              <th className="py-3 px-4">Serial No</th>
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4">Type</th>
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
                </td>

                <td className="py-3 px-4">
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

                <td className="py-3 px-4">
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

                <td className="py-3 px-4">
                  {editingId === asset._id ? (
                    <select
                      value={editForm.assetType || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, assetType: e.target.value })
                      }
                      className="bg-black/30 text-white px-2 py-1 rounded border border-white/20 focus:ring-1 focus:ring-purple-500 outline-none"
                    >
                      {assetTypes.map((type) => (
                        <option key={type} value={type} className="bg-gray-800">
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
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({});
                          }}
                          className="text-gray-400 hover:text-gray-300 transition-all duration-200 transform hover:scale-110"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(asset)}
                          className="text-blue-400 hover:text-blue-300 transition-all duration-200 transform hover:scale-110"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(asset._id)}
                          disabled={loading}
                          className="text-red-400 hover:text-red-300 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
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

      {/* Mobile Card View */}
      <div className="sm:hidden flex flex-col gap-4">
        {currentAssets.map((asset, i) => (
          <motion.div
            key={asset._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: "easeOut", delay: i * 0.05 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 30px rgba(168,85,247,0.12)",
            }}
            className="bg-gradient-to-br from-black/30 to-purple-900/10 backdrop-blur-lg border border-white/6 rounded-xl p-4 shadow-md"
          >
            {editingId === asset._id ? (
              <div className="flex flex-col gap-3">
                <div className="w-full">
                  <label className="text-xs text-white/60">Name</label>
                  <input
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full mt-1 bg-black/30 text-white px-3 py-2 rounded-md border border-white/10 focus:ring-1 focus:ring-purple-500 outline-none"
                  />

                  <div className="mt-3 grid grid-cols-1 gap-2">
                    <div>
                      <label className="text-xs text-white/60">Serial No</label>
                      <input
                        value={editForm.serialNumber || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            serialNumber: e.target.value,
                          })
                        }
                        className="w-full mt-1 bg-black/30 text-white px-3 py-2 rounded-md border border-white/10 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/60">Model</label>
                      <input
                        value={editForm.model || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, model: e.target.value })
                        }
                        className="w-full mt-1 bg-black/30 text-white px-3 py-2 rounded-md border border-white/10 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/60">Type</label>
                      <select
                        value={editForm.assetType || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            assetType: e.target.value,
                          })
                        }
                        className="w-full mt-1 bg-black/30 text-white px-3 py-2 rounded-md border border-white/10 focus:ring-1 focus:ring-purple-500"
                      >
                        {assetTypes.map((t) => (
                          <option key={t} value={t} className="bg-gray-800">
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <StatusBadge
                    status={editForm.status || asset.status}
                    isEditing={true}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSave(asset._id)}
                      disabled={loading}
                      className="text-green-400 hover:text-green-300"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm({});
                      }}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-white font-semibold text-base">
                    {asset.name}
                  </h3>
                  <div className="mt-3 text-xs text-white/80 space-y-1.5">
                    <div className="flex flex-col">
                      <span className="text-white/50">Serial No:</span>
                      <span className="font-semibold text-white/90 break-all">
                        {asset.serialNumber || "—"}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-white/50">Model:</span>
                      <span className="font-semibold text-white/90 break-all">
                        {asset.model || "—"}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-white/50">Type:</span>
                      <span className="capitalize font-semibold text-white/90">
                        {asset.assetType || "—"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={asset.status} assetId={asset._id} />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(asset)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}

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
