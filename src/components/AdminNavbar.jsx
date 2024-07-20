import React from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <button
        className="btn-primary bg-blue-600 border-blue-700 text-white hover:bg-blue-800 hover:border-blue-900"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        className="offcanvas offcanvas-start bg-gray-800 text-white"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header border-b border-gray-600">
          <h5 className="offcanvas-title text-white" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close filter invert"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="nav flex-column">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item mb-2">
                <button
                  className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  onClick={() => handleNavigation("/Admin/Dashboard")}
                >
                  <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  onClick={() => handleNavigation("/DoctorsList")}
                >
                  <i className="fas fa-user-md mr-2"></i> Doctor
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  onClick={() => handleNavigation("/UserList")}
                >
                  <i className="fas fa-users mr-2"></i> Users List
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  onClick={() => handleNavigation("/payment")}
                >
                  <i className="fas fa-credit-card mr-2"></i> Payment
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  onClick={() => handleNavigation("/Appointmentlist")}
                >
                  <i className="fas fa-list mr-2"></i> Appointment List
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn w-full text-left border border-gray-300 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-start p-2 rounded"
                  onClick={() => handleNavigation("/chat")}
                >
                  <i className="fas fa-comments mr-2"></i> Chat
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  onClick={handleLogout}
                  className="btn w-full text-left border border-red-500 text-red-500 hover:bg-red-600 hover:text-white flex items-center justify-start p-2 rounded"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;