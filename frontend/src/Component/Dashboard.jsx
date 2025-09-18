import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-950 via-black to-blue-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-400">
        🎛 Dashboard
      </h1>
      <p className="mb-10 text-gray-300 text-lg">
        Manage and explore your events effortlessly.
      </p>
      <div className="flex flex-wrap gap-6">
        <Link to="/create-event" className="bg-blue-600 px-6 py-3 rounded-xl">
          ➕ Create Event
        </Link>
        <Link to="/events" className="bg-blue-500 px-6 py-3 rounded-xl">
          📅 View All Events
        </Link>
        <Link to="/rsvps" className="bg-blue-400 px-6 py-3 rounded-xl">
          ✅ My RSVPs
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
