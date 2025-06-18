const express = require("express");
const router = express.Router();
const {createAsset} = require("../controllers/assetController");
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");

// For adding a new asset
router.post("/add", verifyToken, allowRoles("admin", "IT"), createAsset);

module.exports = router;
