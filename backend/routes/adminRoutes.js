const express = require("express");
const router = express.Router();
const { adminResetPassword } = require("../controllers/adminController");
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");

// Only admins can reset passwords
router.put("/admin-reset-password", verifyToken, allowRoles("admin"), adminResetPassword);

module.exports = router;
