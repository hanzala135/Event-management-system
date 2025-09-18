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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🎟 My RSVPs</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : rsvps.length === 0 ? (
        <p className="text-gray-500">No RSVPs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rsvps.map((r) => (
            <div
              key={r._id}
              className="bg-white border rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {r.eventId?.title || "Event Title"}
                </h2>
                <p className="text-gray-600 mb-2">
                  📅{" "}
                  {r.eventId?.date
                    ? new Date(r.eventId.date).toLocaleString()
                    : "No date"}
                </p>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    r.status === "Attending"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <Link
                to={`/event/${r.eventId?._id}`}
                className="mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
