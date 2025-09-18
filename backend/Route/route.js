const express = require("express");
const router = express.Router();

const { getRSVPs, createRSVP } = require("../Controller/RSVPCrud");

const registerUser = require("../Controller/Register");
const Login = require("../Controller/Login");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../Controller/CRUD");
const authMiddleware = require("../Middleware/Jwt");

router.post("/register", registerUser);

router.post("/login", Login);

router.post("/website", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: 1,
    message: "Access granted to protected route",
    user: req.user,
  });
});

router.get("/Events", authMiddleware, getEvents);
router.get("/details/:id", authMiddleware, getEventById);

router.post("/createEvent", authMiddleware, createEvent);
router.put("/updateEvent/:id", authMiddleware, updateEvent);

router.delete("/deleteEvent/:id", authMiddleware, deleteEvent);
router.post("/events/:id/rsvp", authMiddleware, createRSVP);

router.get("/rsvps", authMiddleware, getRSVPs); // Get user's RSVPs

module.exports = router;
