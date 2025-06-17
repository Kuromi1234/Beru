require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const assetRoutes = require("./routes/assetRoutes");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());

//routes
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

//err handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found !" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
