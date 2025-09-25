const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./DBconnection");
const router = require("./Route/route.js");

const app = express();
dotenv.config();

app.use(express.json());

app.use(
  cors({
   origin: [
      "https://event-management-system-pvh1.vercel.app", // your frontend
      "http://localhost:5173" // keep for local dev
    ],
    credentials: true,
  })
);

connectDB();

app.use("/hanzala", router);

module.exports = app;
