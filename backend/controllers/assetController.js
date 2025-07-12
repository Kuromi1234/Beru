const Asset = require("../models/asset");
const User = require("../models/user");

exports.createAsset = async (req, res) => {
  try {
    const { name, serialNumber, description, model, assetType, status } =
      req.body;

    // Check for duplicate serial number
    const existing = await Asset.findOne({ serialNumber });
    if (existing) {
      return res.status(400).json({
        message: "Asset exists, duplicate asset creation not allowed!",
      });
    }

    // Create new asset
    const newAsset = new Asset({
      name,
      serialNumber,
      description,
      model,
      assetType,
      status: status || "in_stock",
    });

    await newAsset.save();

    res.status(201).json({
      message: "New Asset added. Keep track of it, IT folks!",
      asset: newAsset,
    });
  } catch (err) {
    console.error("Asset creation error:", err);
    res.status(500).json({ error: err.message });
  }
};
//get all assests

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("assignedTo", "name email");
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
//get assets by id
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.status(200).json(asset);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching asset", error: err.message });
  }
};

//assign asset
exports.assign = async (req, res) => {
  try {
    const { assetID, userID } = req.body;
    const asset = await Asset.findOne({ _id: assetID });
    const user = await User.findOne({ _id: userID });

    if (!asset || !user) {
      res.status(404).json({ message: "Asset or User doesn't exists ! " });
    }
    if (asset.status === "assigned") {
      res.status(400).json({ meassage: "Asset is already assigned !" });
    }
    asset.assignedTo = user._id;
    asset.status = "assigned";
    asset.assignedDate = new Date();

    await asset.save();
    res.status(200).json({ message: `Asset assigned to ${user.name}`, asset });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning asset", error: err.message });
  }
};

//asset retrieve
exports.returnAsset = async (req, res) => {
  try {
    const { assetId, userID } = req.body;

    const asset = await Asset.findById(assetId);
    const user = await User.findById({ _id: userID });
    if (!asset) {
      
      return res.status(404).json({ message: "Asset not found!" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!asset.assignedTo) {
      return res
        .status(400)
        .json({ message: "Asset is not currently assigned." });
    }

    asset.status = "in_stock";
    asset.assignedTo = null;
    asset.returnDate = new Date();

    await asset.save();

    res.status(200).json({
      message: `Asset retrieved successfully from ${user.name} and put back in Stock '`,
      asset,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing return", error: err.message });
  }
};

//controller logic for other status i.e., repair, damaged , to-be-retrieved that will be set by IT

exports.updateAssets = async (req, res) => {
  try {
    const { assetID, assetStatus } = req.body;

    if (!assetID || !assetStatus) {
      return res
        .status(400)
        .json({ message: "Asset ID and Asset-Status is required mate!" });
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
      return res.status(400).json({ message: "The input is not valid" });
    }

    const asset = await Asset.findById(assetID); // FIXED THIS LINE
    if (!asset) {
      return res.status(404).json({ message: "Asset not found!" });
    }

    // Update status
    asset.status = assetStatus;
    await asset.save();

    res.status(200).json({
      message: `Asset status updated to '${assetStatus}' successfully.`,
      asset,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating status", error: err.message });
  }
};
// asset delete only admin permission

exports.deleteasset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByIdAndDelete(id);
    if (!asset) {
      return res.status(404).json({
        message: "The assset your are trying to delete doesn't exist Mr.admin!",
      });
    }
    res
      .status(200)
      .json({ message: "The Asset has been deleted successfully " ,asset });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting asset", error: err.message });
  }
};
//get all assets assigned to the user
exports.UserAssets = async (req, res) => {
  try {
    const userid = req.params.id;
    const asset = await Asset.find({ assignedTo: userid}).populate(
      "assignedTo",
      "name email"
    );
    if (!asset || asset.length === 0) {
      return res
        .status(404)
        .json({ message: "No assets assigned to this user." });
    }

    res.status(200).json({ message: "Assets fetched successfully", asset });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user's assets", error: err.message });
  }
};
//asset stats 

exports.assetStats = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const assignedAssets = await Asset.countDocuments({ status: "assigned" });
    const inStockAssets = await Asset.countDocuments({ status: "in_stock" });
    const damagedAssets = await Asset.countDocuments({ status: "damaged" });
    const repairAssets = await Asset.countDocuments({ status: "repair" });
    const discardedAssets = await Asset.countDocuments({ status: "discarded" });
    const retrievedAssets = await Asset.countDocuments({ status: "retrieved" });
    const toBeRetrieved = await Asset.countDocuments({ status: "to_be_retrieved" });

    const laptopCount = await Asset.countDocuments({ assetType: "laptop" });
    const monitorCount = await Asset.countDocuments({ assetType: "monitor" });

    res.status(200).json({
      totalAssets,
      assignedAssets,
      inStockAssets,
      damagedAssets,
      repairAssets,
      discardedAssets,
      retrievedAssets,
      toBeRetrieved,
      laptopCount,
      monitorCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching asset stats", error: err.message });
  }
};
