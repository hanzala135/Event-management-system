import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvent, getEvent } from "../Api";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getEvent(id);
        setEvent({
          title: data.event.title,
          description: data.event.description,
          date: data.event.date ? data.event.date.split("T")[0] : "",
          location: data.event.location,
        });
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, event);
      alert("✅ Event updated successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Update error:", err);
      alert("⚠️ Failed to update event");
    }
  };

  if (loading) return <p className="p-6">⏳ Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-96 hover:scale-[1.02] transition"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          ✏️ Edit Event
        </h1>

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700">
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
