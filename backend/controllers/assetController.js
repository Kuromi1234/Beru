const Asset = require("../models/asset");
const User = require("../models/user");

exports.createAsset = async (req, res) => {
  try {
    const { name, serialNumber, description, model, assetType, status } = req.body;

    // Check for duplicate serial number
    const existing = await Asset.findOne({ serialNumber });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Asset exists, duplicate asset creation not allowed!" });
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

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("assignedTo", "name email");
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
