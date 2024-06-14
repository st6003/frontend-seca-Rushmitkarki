import React from "react";
import "./AdminDashboard.css";
export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <button
                // className={activeButton === "dashboard" ? "active" : ""}
                // onClick={() => handleButtonClick("dashboard")}
              >
                <i className="fas fa-tachometer-alt icon"></i> Dashboard
              </button>
            </li>
            <li>
              <button
                // className={activeButton === "doctor" ? "active" : ""}
                // onClick={() => handleButtonClick("doctor")}
              >
                <i className="fas fa-user-md icon"></i> Doctor
              </button>
            </li>
            <li>
              <button
                // className={activeButton === "users" ? "active" : ""}
                // onClick={() => handleButtonClick("users")}
              >
                <i className="fas fa-users icon"></i> Users
              </button>
            </li>
            <li>
              <button
                // className={activeButton === "payment" ? "active" : ""}
                // onClick={() => handleButtonClick("payment")}
              >
                <i className="fas fa-credit-card icon"></i> Payment
              </button>
            </li>
            <li>
              <button
                // className={activeButton === "chat" ? "active" : ""}
                // onClick={() => handleButtonClick("chat")}
              >
                <i className="fas fa-comments icon"></i> Chat
              </button>
            </li>
            <li>
              <button
                // className="logout"
                // onClick={() => handleButtonClick("logout")}
              >
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
}
