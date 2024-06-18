import React from "react";

import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="nav flex-column">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100 text-left">
                  <i className="fas fa-tachometer-alt icon"></i> Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100 text-left">
                  <i className="fas fa-user-md icon"></i> Doctor
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100 text-left">
                  <i className="fas fa-users icon"></i> Users
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100 text-left">
                  <i className="fas fa-credit-card icon"></i> Payment
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100 text-left">
                  <i className="fas fa-comments icon"></i> Chat
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="btn btn-outline-primary w-100 text-left"
                  to="/logout"
                >
                  <i className="fas fa-sign-out-alt icon"></i>
                  Logout
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
