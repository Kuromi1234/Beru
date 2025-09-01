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
  getDashboardStats,
  bulkUploadAssets,
} = require("../controllers/assetController");

const {getAssetHistory} = require("../controllers/assetHistoryController");
// Middleware
const { upload } = require("../middleware/uploadMiddleware");
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");



router.post("/add", verifyToken, allowRoles("admin", "IT"), createAsset);
router.get("/stats", verifyToken, allowRoles("admin", "IT"), getDashboardStats);
router.get("/getall", verifyToken, allowRoles("admin", "IT"), getAllAssets);
router.put("/assign", verifyToken, allowRoles("admin", "IT"), assign);
router.put("/update", verifyToken, allowRoles("admin", "IT"), updateAssets);
router.get("/assigned", verifyToken, allowRoles("admin", "IT"), getAssignedAssetsForCurrentUser);
router.get("/history", verifyToken, allowRoles("admin", "IT"),getAssetHistory );
router.post("/bulk", verifyToken, allowRoles("admin", "IT"), upload.single("file"), bulkUploadAssets);
router.get("/:id", verifyToken, allowRoles("admin", "IT"), getAssetById);
router.delete("/delete/:id", verifyToken, allowRoles("admin","IT"), deleteasset);

module.exports = router;
