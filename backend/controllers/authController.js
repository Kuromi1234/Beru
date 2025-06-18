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
    const role = email === "arjunnathhh@gmail.com" ? "admin" : "IT";

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      department,
      role,
    });

    await newUser.save();
    const userobj = newUser.toObject();
    delete userobj.password , userobj.email , userobj.role ; 
    res
      .status(200)
      .json({
        message: "User registered successfully , Now Enjoy and login !",
        user: userobj,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "server side error", error: err.message });
  }
  console.log("bale bale , register hogaya")
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      message:"user logged in successfully ",
      user: {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
