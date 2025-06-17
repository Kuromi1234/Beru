const asset = require('../models/asset');
const users = require('../models/user');
//creating asset 
exports.creatAsset=async(req,res)=>{
    try{
        const{name , serialNumber , description , model , assetType , status}=req.body;
        const existing = await asset.findOne({serialNumber});
        if(existing){
            res.status(400).json({message:"Asset exists , duplicate asset creation not allowed !"});
        }
        const newAsset = new asset({
            name,
            serialNumber,
            descriptionn,
            model,
            assetType,
            status:"in_stock",
        });
        await newAsset.save();
        res.status(202).json({message:"New Asset added , Keep track of it IT folks ! ", asset: newAsset});
    }catch(err){
        res.status(500).json({error:err.meassge});
    }
};
//get all assets 
exports.getAllAssets = async(req,res)=>{
    try {
    const assets = await asset.find().populate("assignedTo", "name email");
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}