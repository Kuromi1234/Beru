const bcrypt = require("bcryptjs");
const User = require("../models/user");

// ADMIN resets password for any user
exports.adminResetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: `Password successfully reset for ${email}.` });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password", error: err.message });
  }
};
