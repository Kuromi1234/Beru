const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    if (department !== "IT") {
      return res
        .status(403)
        .json({ message: "Only IT department can register, mate!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists bro!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      department,
      isAdmin: false,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully , Now Enjoy and login !" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return res
        .status(400)
        .json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { id: foundUser._id, isAdmin: foundUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
