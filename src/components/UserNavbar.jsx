import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faMoneyBillAlt,
  faUserMd,
  faCalendarAlt,
  faInfoCircle,
  faComments,
  faUser,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

const UserNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidebar bg-gray-800 text-white h-screen fixed left-0 top-0 w-64">
      <div className="sidebar-header border-b border-gray-600 p-4">
        <div className="logo-container">
          <img src="/assets/images/logo.png" alt="Memory Guardian Logo" className="sidebar-logo" />
        </div>
        <h5 className="sidebar-title text-white mt-2">Memory Guardian</h5>
      </div>
      <div className="sidebar-body p-4">
        <nav className="nav flex-column">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item mb-3">
              <Link
                to="/Homepage"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" /> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/Payment"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-3" /> Payment
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/doctor"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <FontAwesomeIcon icon={faUserMd} className="mr-3" /> Doctors
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/appointment"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" /> Make an Appointment
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/About"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-3" /> About Us
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/chat"
                className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
              >
                <FontAwesomeIcon icon={faComments} className="mr-3" /> Chat
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item mb-3">
                  <Link
                    to="/Profile"
                    className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                    <strong>{user.firstName}</strong>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-3">
                  <Link
                    to="/login"
                    className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-3" /> Login
                  </Link>
                </li>
                <li className="nav-item mb-3">
                  <Link
                    to="/register"
                    className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-3" /> Register
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