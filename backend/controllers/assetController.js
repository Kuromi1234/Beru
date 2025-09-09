const Asset = require("../models/asset");
const User = require("../models/user");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const AssetHistory = require("../models/assetHistory");

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const {
      name,
      serialNumber,
      description,
      model,
      assetType,
      status,
      employeeId,
    } = req.body;

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
    if (status === "assigned" && empployeeId) {
      const user = await User.findOne({ employeeId });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User with given empid not found" });
      }
      newAsset.assignedTo = user.employeeId;
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

exports.assign = async (req, res) => {
  try {
    const { assetID, assetStatus, assignedTo } = req.body;

    if (
      !assetID ||
      !assignedTo?.employeeId ||
      !assignedTo?.name ||
      !assignedTo?.department
    ) {
      return res.status(400).json({
        message:
          "All fields are required: assetID, assignedTo, name, department",
      });
    }

    const asset = await Asset.findById(assetID);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.status === "assigned") {
      return res.status(400).json({ message: "Asset is already assigned" });
    }

    // Assign asset
    asset.assignedTo = {
      employeeId: assignedTo.employeeId,
      name: assignedTo.name,
      department: assignedTo.department,
    };
    asset.status = assetStatus || "assigned";
    asset.assignedDate = new Date();
    asset.retrievedFrom = null;
    asset.toBeRetrievedFrom = null;
    asset.returnDate = null;

    await asset.save();

    // Create AssetHistory entry
    const history = new AssetHistory({
      asset: asset._id,
      endUser: {
        employeeId: assignedTo.employeeId,
        name: assignedTo.name,
        email: assignedTo.email || "unknown@company.com",
      },
      assignedAt: new Date(),
      assignedBy: req.user.id,
      action: "assigned",
    });

    await history.save();

    res.status(200).json({
      message: `Asset successfully assigned to ${assignedTo.name} (${assignedTo.employeeId})`,
      asset,
      history,
    });
  } catch (err) {
    console.error("Error assigning asset:", err);
    res.status(500).json({
      message: "Error assigning asset",
      error: err.message,
    });
  }
};
// Update asset lifecycle status (unified endpoint)
exports.updateAssets = async (req, res) => {
  try {
    const { assetID, assetStatus, assignedTo } = req.body;

    if (!assetID || !assetStatus) {
      return res
        .status(400)
        .json({ message: "Asset ID and status are required" });
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
      return res.status(400).json({ message: "Invalid asset status provided" });
    }

    const asset = await Asset.findById(assetID);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found!" });
    }

    asset.status = assetStatus;

    if (assetStatus === "assigned") {
      if (!assignedTo) {
        return res.status(400).json({ message: "Assigned user is required" });
      }
      asset.assignedTo = assignedTo;
      asset.assignedDate = new Date();
    }

    if (["in_stock", "damaged", "repair", "discarded"].includes(assetStatus)) {
      asset.assignedTo = null;
      asset.assignedDate = null;
      asset.toBeRetrievedFrom = null;
      asset.retrievedFrom = null;
      asset.returnDate = null;
    }

    if (assetStatus === "retrieved") {
      asset.retrievedFrom = asset.assignedTo;
      asset.returnDate = new Date();
      asset.retrievedAt = new Date();
      asset.assignedTo = null;
      asset.assignedDate = null;
      asset.toBeRetrievedFrom = null;
    }

    if (assetStatus === "to_be_retrieved") {
      asset.toBeRetrievedFrom = asset.assignedTo;
    }

    await asset.save();

    // Determine endUser based on status
    let endUserDetails = { name: "N/A", email: "N/A", employeeId: "N/A" };

    if (assetStatus === "retrieved" && asset.retrievedFrom) {
      endUserDetails = {
        employeeId: asset.retrievedFrom.employeeId,
        name: asset.retrievedFrom.name,
        email: asset.retrievedFrom.email,
      };
    } else if (assetStatus === "to_be_retrieved" && asset.toBeRetrievedFrom) {
      endUserDetails = {
        employeeId: asset.toBeRetrievedFrom.employeeId,
        name: asset.toBeRetrievedFrom.name,
        email: asset.toBeRetrievedFrom.email,
      };
    }

    // === Create history entry ===
    await AssetHistory.create({
      asset: asset._id,
      assignedBy: req.user.id, // the admin/staff
      action: assetStatus,
      assignedTo: asset.assignedTo || null,
      endUser: endUserDetails,
    });

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

// Bulk upload assets from Excel file

// Assuming you have a History model
exports.bulkUploadAssets = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      // optionally cleanup file
      // fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ message: "Excel sheet is empty or invalid" });
    }

    // 1) Read rows into memory
    const rows = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      rows.push({
        name: row.getCell(1).value
          ? String(row.getCell(1).value).trim()
          : "Unknown",
        serialNumber: row.getCell(2).value
          ? String(row.getCell(2).value).trim()
          : null,
        model: row.getCell(3).value
          ? String(row.getCell(3).value).trim()
          : null,
        assetType: row.getCell(4).value
          ? String(row.getCell(4).value).trim()
          : null,
        status: row.getCell(5).value
          ? String(row.getCell(5).value).trim()
          : "in_stock",
      });
    });

    if (rows.length === 0) {
      // fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "No valid rows found in Excel" });
    }

    // 2) Gather serials from uploaded file (exclude nulls)
    const fileSerials = rows.map((r) => r.serialNumber).filter(Boolean);

    // 3) Query DB once for existing serials to avoid repeated findOne() in loop
    const existingDocs = fileSerials.length
      ? await Asset.find({ serialNumber: { $in: fileSerials } })
          .select("serialNumber")
          .lean()
      : [];
    const existingSerialSet = new Set(
      existingDocs.map((d) => String(d.serialNumber))
    );

    // 4) Prepare and insert new assets
    const addedAssets = [];
    const skippedAssets = []; // keep reasons to return better feedback
    const addedSerialsSet = new Set(); // to avoid duplicates inside the file

    for (const row of rows) {
      // missing serial
      if (!row.serialNumber) {
        skippedAssets.push({ reason: "missing_serial" });
        continue;
      }

      // already in DB
      if (existingSerialSet.has(row.serialNumber)) {
        skippedAssets.push({
          reason: "already_exists_db",
          serial: row.serialNumber,
        });
        continue;
      }

      // duplicate inside uploaded file
      if (addedSerialsSet.has(row.serialNumber)) {
        skippedAssets.push({
          reason: "duplicate_in_file",
          serial: row.serialNumber,
        });
        continue;
      }

      // Save new asset (you can use insertMany for bulk, but saving one-by-one keeps things simple & gives full mongoose docs back)
      const newAsset = new Asset(row);
      await newAsset.save();
      addedAssets.push(newAsset);
      addedSerialsSet.add(row.serialNumber);
    }

    // 5) If nothing new was added -> return 409 (or 400) and DO NOT create a successful history entry
    if (addedAssets.length === 0) {
      // fs.unlinkSync(req.file.path);
      return res.status(409).json({
        message:
          "No new assets were added. All rows were duplicates or invalid.",
        addedCount: 0,
        skippedCount: skippedAssets.length,
        skipped: skippedAssets,
      });
    }

    // 6) Build brand and assetType counts from actually added assets
    const brandCounts = addedAssets.reduce((acc, asset) => {
      const brand = (asset.name || "unknown").toString().toLowerCase();
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {});

    const assetTypeCounts = addedAssets.reduce((acc, asset) => {
      const type = asset.assetType || "unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // 7) Create history record referencing User (store _id)
    // 7) Create history record referencing User (store _id)
    const historyRecord = await AssetHistory.create({
      action: "bulk_upload",
      assignedBy: req.user?._id || null, // store User ObjectId
      assignedAt: new Date(),
      details: {
        totalUploaded: addedAssets.length,
        totalSkipped: skippedAssets.length,
        brandCounts,
        assetTypeCounts,
        skippedSerials: skippedAssets.map((s) => s.serial || s.reason),
      },
    });

    // 👇 Now you’ll actually see the created doc
    console.log(
      "BULK HISTORY SAVED ->",
      JSON.stringify(historyRecord, null, 2)
    );

    // optionally cleanup file
    // fs.unlinkSync(req.file.path);

    // 8) Response
    return res.status(200).json({
      message: "Bulk upload completed",
      addedCount: addedAssets.length,
      skippedCount: skippedAssets.length,
      skipped: skippedAssets,
    });
  } catch (error) {
    console.error("Bulk Upload Error:", error);
    return res
      .status(500)
      .json({ message: "Error processing bulk upload", error: error.message });
  }
};
