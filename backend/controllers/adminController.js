const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.adminResetUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true, runValidators: false } // 👈 disable full document validation
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `Password for ${updatedUser.email} reset successfully` });
  } catch (err) {
    console.error("Reset Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
