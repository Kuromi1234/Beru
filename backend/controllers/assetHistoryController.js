const Asset = require("../models/asset");
const AssetHistory = require("../models/assetHistory");

exports.getAssetHistory = async (req, res) => {
  try {
    const { employeeId, serialNumber, fromDate, toDate, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (employeeId) {
      filter["endUser.employeeId"] = employeeId;
    }

    if (serialNumber) {
      const asset = await Asset.findOne({ serialNumber });
      if (asset) {
        filter.asset = asset._id;
      } else {
        return res.status(404).json({ success: false, message: "No asset found" });
      }
    }

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    // Pagination
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (pageNumber - 1) * pageLimit;

    const totalCount = await AssetHistory.countDocuments(filter);

    const history = await AssetHistory.find(filter)
      .populate("asset", "serialNumber model assetType")
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageLimit);

    res.status(200).json({
      success: true,
      totalCount,
      page: pageNumber,
      totalPages: Math.ceil(totalCount / pageLimit),
      history,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
      error: err.message,
    });
  }
};
