import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-200 py-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Memory Guardian
          </Link>

          <div className="flex items-center">
            <ul className="hidden md:flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-800 px-2 py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-800 px-2 py-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-gray-800 px-2 py-1"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/departments"
                  className="text-gray-600 hover:text-gray-800 px-2 py-1"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-gray-600 hover:text-gray-800 px-2 py-1"
                >
                  Doctors
                </Link>
              </li>
            </ul>

            {user ? (
              <div className="ml-2 relative">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  id="navbarDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-40 bg-white rounded-md shadow-lg">
                  <li>
                    <Link to="/profile" className="block px-2 py-1 text-sm">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="block px-2 py-1 text-sm">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/make-appointment"
                      className="block px-2 py-1 text-sm"
                    >
                      Make an Appointment
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-2 py-1 text-sm w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex">
                <Link to="/login" className="btn btn-success me-1">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
