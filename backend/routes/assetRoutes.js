const express = require("express");
const router = express.Router();

// Controller Functions
const {
  createAsset,
  getAllAssets,
  getAssetById,
  assign,
  returnAsset,
  updateAssets,
  deleteasset,
  getAssignedAssetsForCurrentUser,
  getDashboardStats
} = require("../controllers/assetController");

// Middleware
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");



router.post("/add", verifyToken, allowRoles("admin", "IT"), createAsset);
router.get("/stats", verifyToken, allowRoles("admin", "IT"), getDashboardStats);
router.get("/getall", verifyToken, allowRoles("admin", "IT"), getAllAssets);
router.put("/assign", verifyToken, allowRoles("admin", "IT"), assign);
router.put("/retrieve", verifyToken, allowRoles("admin", "IT"), returnAsset);
router.put("/update", verifyToken, allowRoles("admin", "IT"), updateAssets);
router.get("/assigned", verifyToken, allowRoles("admin", "IT"), getAssignedAssetsForCurrentUser);
router.get("/:id", verifyToken, allowRoles("admin", "IT"), getAssetById);
router.delete("/delete/:id", verifyToken, allowRoles("admin","IT"), deleteasset);

module.exports = router;
