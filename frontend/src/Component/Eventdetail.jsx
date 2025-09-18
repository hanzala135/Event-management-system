import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, rsvpEvent } from "../Api";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getEvent(id);
        setEvent(data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("⚠️ Failed to load event details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleRSVP = async (status) => {
    try {
      await rsvpEvent(event._id, status);
      setRsvpStatus(status);
    } catch (err) {
      console.error("RSVP error:", err);
      setError("⚠️ Failed to RSVP");
    }
  };

  if (loading) return <p className="p-6">⏳ Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!event) return <p className="p-6">📭 Event not found</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-2xl shadow-xl max-w-2xl mx-auto mt-6">
      <h1 className="text-3xl font-extrabold text-blue-700">{event.title}</h1>
      <p className="mt-3 text-gray-700">{event.description}</p>
      <p className="mt-3 text-gray-600">📍 {event.location}</p>
      <p className="mt-3 text-gray-600">
        📅 {event.date ? new Date(event.date).toDateString() : "No date set"}
      </p>
      <p className="mt-3 text-gray-600">
        👤 By {event.createdBy?.name} ({event.createdBy?.email})
      </p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-blue-700">RSVP</h2>
        <div className="mt-3 space-x-3">
          <button
            onClick={() => handleRSVP("Attending")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ✅ Attending
          </button>
          <button
            onClick={() => handleRSVP("Not Attending")}
            className="px-5 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
          >
            ❌ Not Attending
          </button>
        </div>
        {rsvpStatus && (
          <p className="mt-3 text-blue-600">
            You have RSVP’d: <strong>{rsvpStatus}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
