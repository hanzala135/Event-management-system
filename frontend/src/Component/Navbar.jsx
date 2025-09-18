import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const linkClasses = (path) =>
    `hover:text-blue-400 transition ${
      location.pathname === path ? "text-blue-400 font-semibold" : ""
    }`;

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center shadow-lg">
      <Link to="/dashboard" className="font-bold text-lg text-blue-500">
        ⚡ Event Manager
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-300">
              👋 {user.user?.name || "User"}
            </span>
            <Link to="/dashboard" className={linkClasses("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/create-event" className={linkClasses("/create-event")}>
              Create
            </Link>
            <Link to="/events" className={linkClasses("/events")}>
              Events
            </Link>
            <Link to="/rsvps" className={linkClasses("/rsvps")}>
              RSVPs
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={linkClasses("/login")}>
              Login
            </Link>
            <Link to="/register" className={linkClasses("/register")}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
