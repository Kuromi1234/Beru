const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");

router.get("/check", verifyToken, allowRoles("admin", "IT"), (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}, you can access this!` });
});

module.exports = router;
