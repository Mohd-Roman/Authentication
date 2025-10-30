import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]); // store list of all users

  useEffect(() => {
    // When page loads, fetch users from backend
    axios
      .get("http://localhost:8000/api/auth/allusers") // new route to get all users
      .then((res) => setUsers(res.data)) // save to state
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Users</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u._id} className="p-3 bg-gray-100 rounded">
            <p className="font-semibold text-black">{u.name}</p>
            <p className="text-sm tex text-gray-500">{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
