import React from "react";
import { Link } from "react-router-dom";

// Utility function to safely get and parse user from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");

  if (user) {
    try {
      // Attempt to parse the JSON string
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  }
  return null;
};

const UserNavbar = () => {
  // Get user from localStorage safely
  const user = getUserFromLocalStorage();

  return (
    <div className="bg-gray-800 text-white h-screen fixed w-64">
      <div className="border-b border-gray-600 p-4">
        <h5 className="text-white">Menu</h5>
      </div>
      <div className="p-4">
        <nav className="flex flex-col">
          <ul className="space-y-2">
            <li>
              <Link
                to="/Homepage"
                className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/Payment"
                className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-money-bill-alt mr-2"></i> Payment
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-user-md mr-2"></i> Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/appointment"
                className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-calendar-alt mr-2"></i> Make an Appointment
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-info-circle mr-2"></i> About Us
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-comments mr-2"></i> Chat
              </Link>
            </li>
            {user ? (
              <li>
                <Link
                  to="/Profilelist"
                  className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                >
                  <i className="fas fa-user mr-2"></i>
                  <strong>{user.firstName}</strong>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i> Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <i className="fas fa-user-plus mr-2"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserNavbar;
