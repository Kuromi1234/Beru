const mongoose = require("mongoose");

const assetHistorySchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: false,
    },
    endUser: {
      name: { type: String, required: false },
      email: { type: String, required: false },
      employeeId: { type: String, required: false },
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // This is the system user (admin/staff) who is assigning
      required: false,
    },
    action: {
      type: String,
      enum: [
        "in_stock",
        "assigned",
        "retrieved",
        "to_be_retrieved",
        "damaged",
        "repair",
        "discarded",
        "bulk_upload",
      ],
      required: true,
    },
    details: {
      totalUploaded: { type: Number, default: 0 },
      totalSkipped: { type: Number, default: 0 },
      brandCounts: { type: Map, of: Number }, // Map<string, number>
      assetTypeCounts: { type: Map, of: Number },
      skippedSerials: [String],
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
