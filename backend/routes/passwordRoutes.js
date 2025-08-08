const express = require("express");
const router = express.Router();
const {
  requestReset,
  resetPassword,
  verifyOtp,
} = require("../controllers/passwordController");
router.post("/request-reset", requestReset);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
