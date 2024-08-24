import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setAuthUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        if (data) {
          try {
            localStorage.setItem("current-user", JSON.stringify(data));
            setAuthUser(data); // Now this should work
            console.log("hello");
          } catch (error) {
            console.error("Error saving to localStorage:", error);
          }
        } // Redirect to profile after successful login
      })
      .catch((error) => {
        console.error("There was a problem with the login request:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-2/5 h-3/4 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">
            New to ChatapP?{" "}
            <Link to="/register" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
