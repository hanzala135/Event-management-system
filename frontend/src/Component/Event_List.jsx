import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "../Api";
import { jwtDecode } from "jwt-decode";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6); // pagination size
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || decoded._id || decoded.userId);
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }

    (async () => {
      try {
        const { data } = await getEvents();
        setEvents(data?.events || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("⚠️ Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      console.log("Trying to delete event:", id);
      const res = await deleteEvent(id);
      console.log("Delete response:", res.data);

      setEvents(events.filter((e) => e._id !== id));
      alert("✅ Event deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("⚠️ Failed to delete event. Check console for details.");
    }
  };

  // 🔍 Filtered & Paginated Events
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  <p className="p-6 bg-gradient-to-br from-gray-900 via-gray-800  min-h-screen text-xl text-white">
    ⏳ Loading...
  </p>;
  if (error)
    return <p className="p-6 text-white bg-gray-600 rounded-md">{error}</p>;

  return (
    <div className="p-6  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 mt-5  text-white flex items-center gap-2">
        🎉 All Events
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        className="border p-3 rounded-lg mb-6 w-full text-white max-w-md focus:ring-2 focus:ring-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Events List */}
      {currentEvents.length === 0 ? (
        <p className="text-gray-600">📭 No matching events found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
            <li
              key={event._id}
              className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div>
                {/* Event Title */}
                <h2 className="text-xl font-bold mb-2 text-white">
                  {event.title}
                </h2>

                {/* Description */}
                <p className="text-gray-100 mb-3">
                  {event.description || "No description"}
                </p>

                {/* Date & Location */}
                <p className="text-sm text-gray-200 mb-1">
                  📅 {event.date ? new Date(event.date).toDateString() : "N/A"}
                </p>
                <p className="text-sm text-gray-200">📍 {event.location}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                {/* View Button */}
                <Link
                  to={`/event/${event._id}`}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                >
                  👉 View
                </Link>

                {/* Edit & Delete Buttons (if user owns the event) */}
                {(event.createdBy?._id === userId ||
                  event.createdBy === userId) && (
                  <>
                    <button
                      onClick={() => navigate(`/event/edit/${event._id}`)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
