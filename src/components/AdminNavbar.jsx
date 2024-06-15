import React from "react";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <button>
                <i className="fas fa-tachometer-alt icon"></i> Dashboard
              </button>
            </li>
            <li>
              <button>
                <i className="fas fa-user-md icon"></i> Doctor
              </button>
            </li>
            <li>
              <button>
                <i className="fas fa-users icon"></i> Users
              </button>
            </li>
            <li>
              <button>
                <i className="fas fa-credit-card icon"></i> Payment
              </button>
            </li>
            <li>
              <button>
                <i className="fas fa-comments icon"></i> Chat
              </button>
            </li>
            <li>  
              <button>
                <i className="fas fa-sign-out-alt icon"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <h1>Admin Dashboard</h1>
        </header>
        <div className="content">
          <div className="dashboard-cards">
            <div className="card">
              <h2>Active Users</h2>
              <p>69</p>
            </div>
            <div className="card">
              <h2>Active Doctors</h2>
              <p>43</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
