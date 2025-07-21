const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // model name should match the actual export in user.model.js (case-sensitive)
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900, // auto-delete after 15 minutes (900s)
  },
});

module.exports = mongoose.model("ResetToken", resetTokenSchema);
