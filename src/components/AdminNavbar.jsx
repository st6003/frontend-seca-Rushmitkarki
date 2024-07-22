import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaUsers,
  FaCreditCard,
  FaList,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.dispatchEvent(new Event("storage"));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar bg-gray-800 text-white h-screen fixed w-64">
      <div className="sidebar-header border-b border-gray-600 p-4">
        <h5 className="sidebar-title text-white text-xl">Admin Menu</h5>
      </div>
      <div className="sidebar-body p-4">
        <nav className="nav flex-column">
          <ul className="nav nav-pills flex-column space-y-2">
            <li className="nav-item">
              <button
                className="btn w-full flex items-center justify-start p-3 rounded text-white hover:bg-gray-700 transition-colors duration-200 border-white border"
                onClick={() => handleNavigation("/Admin/Dashboard")}
              >
                <FaTachometerAlt className="mr-3" /> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn w-full flex items-center justify-start p-3 rounded text-white hover:bg-gray-700 transition-colors duration-200 border-white border"
                onClick={() => handleNavigation("/DoctorsList")}
              >
                <FaUserMd className="mr-3" /> Doctors
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn w-full flex items-center justify-start p-3 rounded text-white hover:bg-gray-700 transition-colors duration-200 border-white border"
                onClick={() => handleNavigation("/UserList")}
              >
                <FaUsers className="mr-3" /> Users List
              </button>
            </li>
            {/* <li className="nav-item">
              <button
                className="btn w-full flex items-center justify-start p-3 rounded text-white hover:bg-gray-700 transition-colors duration-200 border-white border"
                onClick={() => handleNavigation("/payment")}
              >
                <FaCreditCard className="mr-3" /> Payment
              </button>
            </li> */}
            <li className="nav-item">
              <button
                className="btn w-full flex items-center justify-start p-3 rounded text-white hover:bg-gray-700 transition-colors duration-200 border-white border"
                onClick={() => handleNavigation("/Appointmentlist")}
              >
                <FaList className="mr-3" /> Appointment List
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn w-full flex items-center justify-start p-3 rounded text-white hover:bg-gray-700 transition-colors duration-200 border-white border"
                onClick={() => handleNavigation("/chat")}
              >
                <FaComments className="mr-3" /> Chat
              </button>
            </li>
            <li className="nav-item mt-4">
              <button
                onClick={handleLogout}
                className="btn w-full flex items-center justify-start p-3 rounded text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-200 border-white border"
              >
                <FaSignOutAlt className="mr-3" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
