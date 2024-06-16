import React from "react";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user && user.isAdmin ? <AdminNavbar /> : <UserNavbar />;
};

export default Navbar;
