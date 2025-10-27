require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const assetRoutes = require("./routes/assetRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const app = express();


// Middleware
app.use(express.json());

//routes
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/passwd",passwordRoutes);
app.use("/api/admin",adminRoutes);

//err handler
app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});



// Global error handler
app.use(errorHandler);

//for monitoring 
app.get("/", (req, res) => {
  res.send("✅ Beru backend is running fine!");
});




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
