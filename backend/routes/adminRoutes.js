const express = require("express");
const router = express.Router();
const {adminResetUserPassword , deleteUser} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole"); 

// Only admins can reset passwords
router.put("/adminpsswd/:id", verifyToken, allowRoles("admin"), adminResetUserPassword);
router.delete("/deleteuser/:id", verifyToken, allowRoles("admin"), deleteUser);

module.exports = router;
