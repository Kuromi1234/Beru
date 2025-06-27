const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    model: {
      type: String,
      required: true,
    },
    assetType: {
      type: String,
      enum: ["Laptop", "Monitor", "Keyboard", "Mouse", "Phone", "Other"],
      required: true,
    },
    status: {  
      type: String,
      enum: ["in_stock", "assigned", "retrieved","to_be_retrieved", "damaged", "repair", "discarded"],
      default: "in_stock",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    assignedDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);  