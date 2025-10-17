const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration
exports.register = async (req, res) => {
  try {
    const { employeeId, name, email, password, department } = req.body;
    if (department !== "IT") {
      return res
        .status(403)
        .json({ message: "Only IT department can register, mate!" });
    }
    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists bro!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === "arjunnathhh@gmail.com" ? "admin" : "IT";

    const newUser = new User({
      employeeId,
      name,
      email,
      password: hashedPassword,
      department,
      role,
    });

    await newUser.save();
    const userobj = newUser.toObject();
    delete userobj.password, userobj.email, userobj.role;
    res.status(200).json({
      message: "User registered successfully , Now Enjoy and login !",
      user: userobj,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "server side error", error: err.message });
  }
  console.log("bale bale , register hogaya");
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
      { id: foundUser._id, role: foundUser.role  , employeeId: foundUser.employeeId, name: foundUser.name  ,department: foundUser.department },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      message: "user logged in successfully ",
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        employeeId: foundUser.employeeId,
        department: foundUser.department,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Fixed: Consistent response structure with other endpoints
    res.status(200).json({
      user: {
        id: user._id,
        empid: user.empid,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
