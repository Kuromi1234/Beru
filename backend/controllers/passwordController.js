const crypto = require("crypto");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const ResetToken = require("../models/ressetToken");
const sendEmail = require("../utils/sendemail");

exports.requestReset = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  await ResetToken.findOneAndDelete({ userId: user._id });

  const resetToken = new ResetToken({ userId: user._id, token });
  await resetToken.save();

  await sendEmail(
    user.email,
    "Your OTP for Password Reset (Valid for 15 Minutes)",
    `Hello ${
      user.name || "user"
    },\n\nYour 6-digit OTP is: ${token}\n\nDo not share it with anyone.\n\n- Team BERU`
  );

  res.status(200).json({ message: "OTP sent to your email." });
};

// verify OTP and reset psswd
exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const resetToken = await ResetToken.findOne({ userId: user._id, token });
  if (!resetToken)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await ResetToken.deleteOne({ _id: resetToken._id });  

  res
    .status(200)
    .json({ message: "Password reset successful. You can now log in." });
};
