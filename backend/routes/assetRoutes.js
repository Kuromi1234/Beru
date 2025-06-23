const express = require("express");
const router = express.Router();
const {createAsset , getAllAssets , getAssetById , assign, returnAsset ,updateAssets} = require("../controllers/assetController");
const { verifyToken } = require("../middleware/verifytoken");
const { allowRoles } = require("../middleware/checkrole");

// Routes
router.post("/add", verifyToken, allowRoles("admin", "IT"), createAsset);
router.get("/getall", verifyToken, allowRoles("admin", "IT"), getAllAssets);
router.get("/:id", verifyToken, allowRoles("admin", "IT"), getAssetById);
router.put("/assign", verifyToken, allowRoles("admin", "IT"), assign);
router.put("/retrieve", verifyToken, allowRoles("admin", "IT"), returnAsset);
router.put("/update", verifyToken, allowRoles("admin", "IT"), updateAssets);



module.exports = router;
