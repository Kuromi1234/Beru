const bcrypt = require("bcryptjs");
const User = require("../models/user");
//admin reset password
exports.adminResetUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: `Password for ${user.email} reset successfully` });
  } catch (err) {
    console.error("Reset Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
