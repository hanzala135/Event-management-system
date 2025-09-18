import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

function Welcome() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.post("/website");
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.log("User Data:", user);
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-100">
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.email} 🎉</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Welcome;
