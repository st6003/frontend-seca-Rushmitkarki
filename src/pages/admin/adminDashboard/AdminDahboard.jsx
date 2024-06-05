import React from "react";

export default function AdminDashboard() {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="user-profile">
          <img
            src="/assets/images/profile.png"
            alt="user"
            height={100}
            width={100}
          />
          <span>Hello, MR. Rushmit karki</span>
        </div>
        <div className="nav-bar">
          <button className="nav-button">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button className="nav-button">
            <i className="fas fa-users"></i> Patients
          </button>
          <button className="nav-button">
            <i className="fas fa-credit-card"></i> Payment
          </button>
          <button className="nav-button">
            <i className="fas fa-comments"></i> Chat
          </button>
          <div className="spacer"></div>
          <button className="nav-button logout">
            <i className="fas fa-sign-out-alt"></i> Log Out
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="health-chart">
          <h3>Health Overview</h3>
          <div className="chart">
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" fill="#C6E2B5" />
              <circle cx="50" cy="50" r="30" fill="#F7DC6F" />
              <circle cx="50" cy="50" r="20" fill="#9BC2E6" />
            </svg>
            <div className="chart-legend">
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
            </div>
          </div>
        </div>
        <div className="content">{/* Your dashboard content goes here */}</div>
      </div>
    </div>
  );
}
