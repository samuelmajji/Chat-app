import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/Logout";
import { useAuthContext } from "../context/Authcontext"; // Adjust the path as needed

const Header = () => {
  const { logout } = useLogout(); // Use the useLogout hook
  const { authUser } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="p-4 shadow-lg fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex-none w-1/4 my-2">
          <h1 className="text-white text-3xl font-extrabold ml-4 tracking-widest">
            My Website
          </h1>
        </div>
        <div className="flex-grow flex justify-center items-center w-1/2">
          <input
            className="border border-white rounded-full bg-white text-gray-700 w-full max-w-md px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Search..."
          />
        </div>
        <nav className="flex-none w-1/4 flex justify-center items-center space-x-4">
          {authUser && (
            <button
              onClick={handleLogout}
              className="text-white text-lg font-semibold hover:text-gray-300"
            >
              Logout
            </button>
          )}
          {authUser && (
            <Link
              to="/"
              className="text-white text-lg font-semibold hover:text-gray-300"
            >
              Home
            </Link>
          )}
          {!authUser && (
            <Link
              to="/login"
              className="text-white text-lg font-semibold hover:text-gray-300"
            >
              Login
            </Link>
          )}
          {!authUser && (
            <Link
              to="/register"
              className="text-white text-lg font-semibold hover:text-gray-300"
            >
              Register
            </Link>
          )}
          {authUser && (
            <Link
              to="/profile"
              className="text-white text-lg font-semibold hover:text-gray-300"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Chat Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
