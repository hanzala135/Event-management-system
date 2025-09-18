const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ success: 0, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info
    next();
  } catch (error) {
    return res.status(403).json({ success: 0, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
