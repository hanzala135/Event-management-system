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

  if (loading) return <p className="p-6">⏳ Loading events...</p>;
  if (error)
    return <p className="p-6 text-red-600 bg-red-100 rounded-md">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        🎉 All Events
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        className="border p-3 rounded-lg mb-6 w-full max-w-md focus:ring-2 focus:ring-blue-400"
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
              className="bg-white border rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-3">
                  {event.description || "No description"}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {event.date ? new Date(event.date).toDateString() : "N/A"}
                </p>
                <p className="text-sm text-gray-500">📍 {event.location}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/event/${event._id}`}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  👉 View
                </Link>
                {(event.createdBy?._id === userId ||
                  event.createdBy === userId) && (
                  <>
                    <button
                      onClick={() => navigate(`/event/edit/${event._id}`)}
                      className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700"
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
