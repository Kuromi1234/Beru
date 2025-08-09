

const mongoose = require("mongoose");

const assetHistorySchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    endUser: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      employeeId: { type: String, required: true },
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // This is the system user (admin/staff) who is assigning
      required: true,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssetHistory", assetHistorySchema);