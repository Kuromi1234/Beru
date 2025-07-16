const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole"); 

// Only admins can reset passwords
router.put("/adminpsswd", verifyToken, allowRoles("admin"), adminController.adminResetUserPassword);


module.exports = router;
