import React, { useEffect, useState } from "react";
import { getRSVPs } from "../Api";
import { Link } from "react-router-dom";

const RSVPs = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getRSVPs();
        setRsvps(data.rsvps || []);
      } catch (err) {
        console.error("Error fetching RSVPs:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 m12 text-white">🎟 My RSVPs</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : rsvps.length === 0 ? (
        <p className="text-gray-500">No RSVPs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rsvps.map((r) => (
            <div
              key={r._id}
              className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div>
                {/* Event Title */}
                <h2 className="text-xl font-bold mb-2 text-blue-400">
                  {r.eventId?.title || "Event Title"}
                </h2>

                {/* Event Date */}
                <p className="text-gray-300 mb-2">
                  📅{" "}
                  {r.eventId?.date
                    ? new Date(r.eventId.date).toLocaleString()
                    : "No date"}
                </p>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    r.status === "Attending"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {r.status}
                </span>
              </div>

              {/* View Event Button */}
              <Link
                to={`/event/${r.eventId?._id}`}
                className="mt-4 inline-block text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg shadow transition"
              >
                View Event
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RSVPs;
