import React from "react";
import { Link } from "react-router-dom";

const ProfileList = () => {
  return (
    <div
      className="profile-list-container"
      style={{ marginLeft: "250px", padding: "20px" }}
    >
      <h1>Your profile list</h1>
      <div
        className="stats-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link
          to="/Profile"
          className="stat-box"
          style={{
            backgroundColor: "#3498db",
            padding: "20px",
            borderRadius: "5px",
            color: "white",
            textDecoration: "none",
            width: "30%",
          }}
        >
          <h2>Update Profile</h2>
          <p>Update you profile..</p>
        </Link>
        <Link
          to="/Your Appointment List"
          className="stat-box"
          style={{
            backgroundColor: "#2ecc71",
            padding: "20px",
            borderRadius: "5px",
            color: "white",
            textDecoration: "none",
            width: "30%",
          }}
        >
          <h1>Appointment List</h1>
          <p>Check your Appointment List</p>
        </Link>
        <Link
          to="/FavouriteList"
          className="stat-box"
          style={{
            backgroundColor: "#f1c40f",
            padding: "20px",
            borderRadius: "5px",
            color: "white",
            textDecoration: "none",
            width: "30%",
          }}
        >
          <h1>Favourite Doctors</h1>
          <p>See you Favourite Doctors</p>
        </Link>
      </div>
    </div>
  );
};

export default ProfileList;
