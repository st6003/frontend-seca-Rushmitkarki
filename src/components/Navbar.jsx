import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");

  if (user && user !== "undefined") {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  }
  return null;
};

const Navbar = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  useEffect(() => {
    // Update user state when localStorage is modified
    const handleStorageChange = () => {
      setUser(getUserFromLocalStorage());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return user && user.isAdmin ? <AdminNavbar /> : <UserNavbar />;
};

export default Navbar;