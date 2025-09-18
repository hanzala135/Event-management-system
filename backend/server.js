const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./DBconnection");
const router = require("./Route/route.js");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

connectDB();

app.use("/hanzala", router);

app.listen(PORT, () => {
  try {
    console.log("Server is running on port " + PORT);
  } catch (error) {
    console.log("Error in server setup", error);
  }
});
