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
      enum: ["Laptop", "Monitor", "Keyboard", "Mouse", "desktop", "Other","laptop", "monitor", "keyboard", "mouse", "desktop", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in_stock", "assigned", "retrieved", "to_be_retrieved", "damaged", "repair", "discarded"],
      default: "in_stock",
    },

    // When asset is currently assigned to someone
    assignedTo: {
      employeeId: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      department: {
        type: String,
        default: null,
      }
    },
    assignedDate: {
      type: Date,
    },

    // If asset has been retrieved back from a user
    retrievedFrom: {
      employeeId: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
    },
    returnDate: {
      type: Date,
    },

    // If asset is marked to be retrieved from someone
    toBeRetrievedFrom: {
      employeeId: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
