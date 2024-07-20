import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";

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
    <div className="sidebar bg-gray-800 text-white h-screen fixed">
      <div className="sidebar-header border-b border-gray-600 p-4">
        <h5 className="sidebar-title text-white">Menu</h5>
      </div>
      <div className="sidebar-body p-4">
        <nav className="nav flex-column">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item mb-2">
              <Link
                to="/Homepage"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/Payment"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-money-bill-alt mr-2"></i> Payment
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/doctors"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-user-md mr-2"></i> Doctors
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/appointment"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-calendar-alt mr-2"></i> Make an Appointment
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/About"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-info-circle mr-2"></i> About Us
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/chat"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <i className="fas fa-comments mr-2"></i> Chat
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item mb-2">
                  <Link
                    to="/Profile"
                    className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <span>
                      <i className="fas fa-user mr-2"></i>
                    </span>
                    <strong>{user.firstName}</strong>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-2">
                  <Link
                    to="/login"
                    className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i> Login
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/register"
                    className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
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