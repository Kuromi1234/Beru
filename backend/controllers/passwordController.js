const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const ResetToken = require("../models/ressetToken");
const sendEmail = require("../utils/sendemail");

// Request password reset
exports.requestReset = async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove any existing token for this user
    await ResetToken.findOneAndDelete({ userId: user._id });

    // Save new token
    const resetToken = new ResetToken({ userId: user._id, token });
    await resetToken.save();

    // Send OTP via email
    await sendEmail(
      normalizedEmail,
      "Your OTP for Password Reset (Valid for 15 Minutes)",
      `Hello ${user.name || "User"},\n\nYour 6-digit OTP is: ${token}\n\nThis OTP is valid for 15 minutes. Do not share it with anyone.\n\n- Team BERU`
    );

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("Error in requestReset:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// otp verification
exports.verifyOtp = async (req, res) => {
  const { email, token } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = await ResetToken.findOne({ userId: user._id, token });
    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error in verifyOtp:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

//pswd reset
exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = await ResetToken.findOne({ userId: user._id, token });
    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Password strength validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save({ validateBeforeSave: false });

    // Delete OTP token after use
    await ResetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
