import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/Login" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    // role not authorised so redirect to home page
    return <Navigate to="/" />;
  }

  // authorised so return child components
  return children;
};

export default PrivateRoute;
