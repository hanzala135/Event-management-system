const Event = require("../Module/Event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });

    return res.status(200).json({ success: 1, events: events });
  } catch (error) {
    console.error("Get Event error:", error);
    return res
      .status(500)
      .json({ success: 0, message: "Something went wrong" });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    if (!title || !description || !date || !location) {
      return res.status(400).json({ success: 0, message: "Invalid data" });
    }
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id,
    });
    await newEvent.save();
    return res.status(201).json({
      success: 1,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Create Event error:", error);
    return res
      .status(500)
      .json({ success: 0, message: "Something went wrong" });
  }
};
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ success: 0, message: "Invalid data" });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: 0, message: "Event not found" });
    }
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: 0, message: "Unauthorized" });
    }
    event.title = title;
    event.description = description;
    event.date = date;
    await event.save();

    return res
      .status(200)
      .json({ success: 1, message: "Event updated successfully", event });
  } catch (error) {
    console.error("Update Event error:", error);
    return res
      .status(500)
      .json({ success: 0, message: "Something went wrong" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
};

// Controller/CRUD.js
// make sure Event model is imported

// existing exports: getEvents, createEvent, updateEvent, deleteEvent

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    console.log(event);

    if (!event) {
      return res.status(404).json({ success: 0, message: "Event not found" });
    }

    return res.status(200).json({ success: 1, event });
  } catch (error) {
    console.error("Get single Event error:", error);
    return res
      .status(500)
      .json({ success: 0, message: "Something went wrong" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
};
