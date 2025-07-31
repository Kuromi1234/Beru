const Asset = require("../models/asset");
const assetHistory = require("../models/assetHistory");

exports.getAssetHistory = async (req, res) => {
  try {
    const { empid, serialNumber, fromDate, toDate } = req.query;

    let filter = {};

    if (empid) {
      filter["endUser.empid"] = empid;
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
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) filter.date.$lte = new Date(toDate);
    }

    const history = await assetHistory.find(filter)
      .populate("asset", "serialNumber model assetType")
      .populate("assignedBy", "name email");

    res.status(200).json({
      success: true,
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
