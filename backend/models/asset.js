const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    SerialNumber: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
      required: true,
    },
    DeviceType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["assignedto", "retrieved", "instock"],
      default: "instock",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Asset", assetSchema);
