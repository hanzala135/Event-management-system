import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const linkClasses = (path) =>
    `hover:text-blue-400 transition ${
      location.pathname === path ? "text-blue-400 font-semibold" : ""
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900/60 to-gray-800/80 backdrop-blur-md p-6 shadow-lg flex items-center justify-between text-white">
      {/* Left Logo */}
      <div className="flex items-center">
        <Link
          to="/dashboard"
          className="font-bold text-2xl text-white
        "
        >
          ⚡ Event Manager
        </Link>
      </div>

      {/* Center Menu */}

      {user ? (
        <div className="flex-1 flex justify-center space-x-8">
          <>
            <Link
              to="/dashboard"
              className="text-white font-medium hover:text-blue-500 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/create-event"
              className="text-white font-medium hover:text-blue-500 transition"
            >
              Create
            </Link>
            <Link
              to="/events"
              className="text-white  font-medium hover:text-blue-500 transition"
            >
              Events
            </Link>
            <Link
              to="/rsvps"
              className="text-white  font-medium hover:text-blue-500 transition"
            >
              RSVPs
            </Link>
          </>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <>
            <Link
              to="/login"
              className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-black hover:text-white  cursor:pointer transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-black hover:text-white  cursor:pointer transition"
            >
              Register
            </Link>
          </>
        </div>
      )}

      {/* Right Button + Username */}
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="text-white  text-2xl font-medium">
              Hi, {user.user?.name || "User"} 👋
            </span>
            <button
              onClick={logout}
              className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-black hover:text-white  cursor:pointer transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
