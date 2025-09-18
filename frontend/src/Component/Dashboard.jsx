import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-8 pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center text-white">
      {/* Heading */}
      <h1 className="text-6xl font-extrabold mb-4 text-blue-500">
        🎛 Dashboard
      </h1>
      <p className="mb-10 text-gray-300 text-lg text-center max-w-xl">
        Manage and explore your events effortlessly. Keep track of all your
        events and RSVPs in one place.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6">
        <Link
          to="/create-event"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          ➕ Create Event
        </Link>
        <Link
          to="/events"
          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          📅 View All Events
        </Link>
        <Link
          to="/rsvps"
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          ✅ My RSVPs
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
