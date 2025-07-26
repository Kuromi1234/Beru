const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, getUserProfile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifytoken");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;