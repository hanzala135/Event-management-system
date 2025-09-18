import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../Api";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      alert("✅ Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      alert("⚠️ Failed to create event");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 hover:scale-[1.02] transition"
      >
        <h2 className="text-3xl mb-6 font-extrabold text-center text-blue-700">
          Create Event
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="border w-full mb-4 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="border w-full mb-4 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="date"
          className="border w-full mb-4 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="border w-full mb-6 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700">
          🚀 Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
