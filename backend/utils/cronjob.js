const cron = require("node-cron");
const Asset = require("../models/asset");
const AssetHistory = require("../models/assetHistory");

cron.schedule("0 * * * *", async () => {
  const now = new Date();
  const assets = await Asset.find({
    status: "retrieved",
    updatedAt: { $lte: new Date(now - 24 * 60 * 60 * 1000) }
  });

  for (const asset of assets) {
    asset.status = "in_stock";
    asset.endUser = null;
    await asset.save();

    await AssetHistory.create({
      asset: asset._id,
      performedBy: null, // system action
      action: "restocked",
    });
  }

  console.log(`[CRON] Restocked ${assets.length} assets`);
});
