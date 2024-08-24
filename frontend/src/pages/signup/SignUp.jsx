import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { setAuthUser } = useAuthContext(); // Make sure this is available

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault(); // Corrected method name

    fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Sending form data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Signup successful:", data);
        if (data) {
          try {
            localStorage.setItem("current-user", JSON.stringify(data));
            setAuthUser(data); // Now this should work
            console.log("hello");
          } catch (error) {
            console.error("Error saving to localStorage:", error);
          }
        }
      })
      .catch((error) => {
        console.error("There was a problem with the signup request:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-2/5 h-4/5 bg-white shadow-lg rounded-lg p-8 flex items-center">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Register
          </h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
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
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>

            {/* Link to Login */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>

            <button
              type="submit"
              onClick={handleClick}
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
