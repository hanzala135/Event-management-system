const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbURL = process.env.URL;
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
