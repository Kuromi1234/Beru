const express = require("express");
const router = express.Router();
const {createAsset , getAllAssets , getAssetById} = require("../controllers/assetController");
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");

// For adding a new asset
router.post("/add", verifyToken, allowRoles("admin", "IT"), createAsset);
router.get("/getall", verifyToken, allowRoles("admin", "IT"), getAllAssets);
router.get("/:id", verifyToken, allowRoles("admin", "IT"), getAssetById);

module.exports = router;
