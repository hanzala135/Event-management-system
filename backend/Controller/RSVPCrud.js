const RSVP = require("../Module/RSPV");

const createRSVP = async (req, res) => {
  try {
    const { id } = req.params; // event id
    const { status } = req.body;

    const userId = req.user.id || req.user._id || req.user.userId;

    if (!status) {
      return res.status(400).json({ message: "RSVP status is required" });
    }

    let rsvp = await RSVP.findOne({ userId, eventId: id });

    console.log("Existing RSVP:", rsvp);
    if (rsvp) {
      rsvp.status = status;
      await rsvp.save();
    } else {
      rsvp = await RSVP.create({
        userId,
        eventId: id,
        status,
      });
    }

    return res.status(200).json({
      message: "RSVP saved successfully",
      rsvp,
    });
  } catch (error) {
    console.error("RSVP error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ userId: req.user.id }).populate(
      "eventId",
      "title date description"
    ); 

    return res.status(200).json({ success: 1, rsvps });
  } catch (error) {
    console.error("Get RSVP error:", error);
    return res.status(500).json({ success: 0, message: "RSVP fetch failed" });
  }
};

module.exports = { createRSVP, getRSVPs };
