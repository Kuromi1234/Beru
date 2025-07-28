const Asset = require("../models/asset");
const User = require("../models/user");
const mongoose = require("mongoose");

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const { name, serialNumber, description, model, assetType, status, empid } =
      req.body;

    const existing = await Asset.findOne({ serialNumber });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Asset already exists with this serial number." });
    }

    const newAsset = new Asset({
      name,
      serialNumber,
      description,
      model,
      assetType,
    });

    // If being assigned directly
    if (status === "assigned" && empid) {
      const user = await User.findOne({ empid });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User with given empid not found" });
      }
      newAsset.assignedTo = user._id;
      newAsset.status = "assigned";
      newAsset.assignedDate = new Date();
    } else {
      newAsset.status = status || "in_stock";
    }

    await newAsset.save();

    res.status(201).json({
      message: "New Asset added successfully",
      asset: newAsset,
    });
  } catch (err) {
    console.error("Asset creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate(
      "assignedTo",
      "name empid email"
    );
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate(
      "assignedTo",
      "name empid email"
    );
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.status(200).json(asset);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching asset", error: err.message });
  }
};

// Assign asset to user (by empid)
exports.assign = async (req, res) => {
  try {
    const { assetID, assetStatus, assignedTo } = req.body;

    if (
      !assetID ||
      !assignedTo?.empid ||
      !assignedTo?.name ||
      !assignedTo?.department
    ) {
      return res.status(400).json({
        message:
          "All fields are required: assetID, assignedTo.empid, name, department",
      });
    }

    // Find the asset by ID
    const asset = await Asset.findById(assetID);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    // Prevent re-assignment
    if (asset.status === "assigned") {
      return res.status(400).json({ message: "Asset is already assigned" });
    }

    // Assign asset
    asset.assignedTo = {
      employeeId: assignedTo.empid,
      name: assignedTo.name,
      department: assignedTo.department,
    };
    asset.status = assetStatus || "assigned";
    asset.assignedDate = new Date();

    // Clear any previous retrieval metadata
    asset.retrievedFrom = null;
    asset.toBeRetrievedFrom = null;
    asset.returnDate = null;

    await asset.save();

    res.status(200).json({
      message: `Asset successfully assigned to ${assignedTo.name} (${assignedTo.empid})`,
      asset,
    });
  } catch (err) {
    console.error("Error assigning asset:", err);
    res.status(500).json({
      message: "Error assigning asset",
      error: err.message,
    });
  }
};

// Retrieve asset from user (by empid)
exports.returnAsset = async (req, res) => {
  try {
    const { assetId, empid } = req.body;

    const asset = await Asset.findById(assetId);
    const user = await User.findOne({ empid });

    if (!asset || !user) {
      return res.status(404).json({ message: "Asset or User not found!" });
    }

    if (!asset.assignedTo) {
      return res.status(400).json({ message: "Asset is not assigned" });
    }

    asset.status = "retrieved";
    asset.assignedTo = null;
    asset.returnDate = new Date();

    await asset.save();

    res.status(200).json({
      message: `Asset retrieved from ${user.name} and marked as retrieved.`,
      asset,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing return", error: err.message });
  }
};

// Update asset lifecycle status (unified endpoint)
exports.updateAssets = async (req, res) => {
  try {
    const { assetID, assetStatus } = req.body;

    if (!assetID || !assetStatus) {
      return res.status(400).json({
        message: "Asset ID and status are required",
      });
    }

    const allowedStatuses = [
      "in_stock",
      "assigned",
      "retrieved",
      "to_be_retrieved",
      "damaged",
      "repair",
      "discarded",
    ];

    if (!allowedStatuses.includes(assetStatus)) {
      return res.status(400).json({
        message: "Invalid asset status provided",
      });
    }

    const asset = await Asset.findById(assetID);
    if (!asset) {
      return res.status(404).json({
        message: "Asset not found!",
      });
    }

    // Update asset status
    asset.status = assetStatus;

    if (
      assetStatus === "in_stock" ||
      assetStatus === "damaged" ||
      assetStatus === "repair" ||
      assetStatus === "discarded"
    ) {
      // Clear user-assignment fields
      asset.assignedTo = null;
      asset.assignedDate = null;
      asset.toBeRetrievedFrom = null;
      asset.retrievedFrom = null;
      asset.returnDate = null;
    }

    if (assetStatus === "retrieved") {
      asset.retrievedFrom = asset.assignedTo;
      asset.returnDate = new Date();
      asset.assignedTo = null;
      asset.assignedDate = null;
      asset.toBeRetrievedFrom = null;
    }

    if (assetStatus === "to_be_retrieved") {
      asset.toBeRetrievedFrom = asset.assignedTo;
    }

    await asset.save();

    res.status(200).json({
      message: `Asset status updated to '${assetStatus}'`,
      asset,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating asset",
      error: err.message,
    });
  }
};

// Delete an asset
exports.deleteasset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByIdAndDelete(id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({ message: "Asset deleted successfully", asset });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting asset", error: err.message });
  }
};

// Get assets assigned to currently logged-in user
exports.getAssignedAssetsForCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware

    const assets = await Asset.find({
      assignedTo: userId, 
      status: { $ne: "in_stock" }, 
    }).populate("assignedTo", "name empid email");

    res.status(200).json({
      success: true,
      assets,
    });
  } catch (err) {
    console.error("Error fetching assigned assets:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned assets",
      error: err.message,
    });
  }
};

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const in_stock = await Asset.countDocuments({ status: "in_stock" });
    const assigned = await Asset.countDocuments({ status: "assigned" });
    const damaged = await Asset.countDocuments({ status: "damaged" });
    const repair = await Asset.countDocuments({ status: "repair" });
    const to_be_retrieved = await Asset.countDocuments({
      status: "to_be_retrieved",
    });
    const retrieved = await Asset.countDocuments({ status: "retrieved" });
    const discarded = await Asset.countDocuments({ status: "discarded" });

    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
    const totalAssignedAssets = await Asset.countDocuments({
      assignedTo: { $ne: null },
    });

    const recentAdded = await Asset.find().sort({ createdAt: -1 }).limit(5);
    const recentAssigned = await Asset.find({ status: "assigned" })
      .sort({ assignedDate: -1 })
      .limit(5)
      .populate("assignedTo", "name empid email");

    const recentRetrieved = await Asset.find({ status: "retrieved" })
      .sort({ returnDate: -1 })
      .limit(5)
      .populate("assignedTo", "name empid email");

    res.status(200).json({
      totalAssets,
      in_stock,
      assigned,
      damaged,
      repair,
      to_be_retrieved,
      retrieved,
      discarded,
      totalUsers,
      totalAssignedAssets,
      recentAdded,
      recentAssigned,
      recentRetrieved,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching dashboard stats", error: err.message });
  }
};
