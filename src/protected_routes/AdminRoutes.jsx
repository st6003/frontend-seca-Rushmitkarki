import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  // get user data first
  const user = JSON.parse(localStorage.getItem("user"));
  // check if user is admin
  // if admin give all access
  return user != null && user.isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminRoutes;
