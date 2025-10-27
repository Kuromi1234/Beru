const express = require("express");
const router = express.Router();
//for monitoring 
app.get("/", (req, res) => {
  res.send("✅ Beru backend is running fine!");
});

module.exports = router;