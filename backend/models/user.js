const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type:String,
      required: true,
    },
    role:{
      type:String,
      enum:['admin','IT','Employee'],
      default:'Employee',
    },
  },
  { timestamps: true }
); //adds createdat and updated at automatically

module.exports = mongoose.model("user", userSchema);
