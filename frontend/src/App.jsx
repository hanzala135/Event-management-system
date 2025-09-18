import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Register from "./Component/Signup";
import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";
import Events from "./Component/Eventlist";
import CreateEvent from "./Component/CreateEvent";
import EventDetail from "./Component/EventDetail";
import RSVPs from "./Component/RSPV";
import ProtectedRoute from "./Component/ProtectedRoute";
import { AuthProvider } from "./Component/AuthContext";
import EditEvent from "./Component/EditEvent";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/edit/:id" element={<EditEvent />} />
          <Route path="/events" element={<Events />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rsvps"
            element={
              <ProtectedRoute>
                <RSVPs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
