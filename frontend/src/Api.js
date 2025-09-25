import axios from "axios";

const API = axios.create({ 
  baseURL: "https://event-management-system-red-two.vercel.app/hanzala" 
});
// Attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});
// ================= Auth =================
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);

// ================= Events =================
export const getEvents = () => API.get("/Events");
export const getEvent = (id) => API.get(`/details/${id}`);
export const createEvent = (data) => API.post("/createEvent", data);
export const updateEvent = (id, data) => API.put(`/updateEvent/${id}`, data);
export const deleteEvent = (id) => API.delete(`/deleteEvent/${id}`);

// ================= RSVP =================
export const rsvpEvent = (id, status) =>
  API.post(`/events/${id}/rsvp`, { status });

export const getRSVPs = () => API.get("/rsvps");
