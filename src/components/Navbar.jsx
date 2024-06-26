import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Listen to storage changes to update user state when localStorage is modified
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return user && user.isAdmin ? <AdminNavbar /> : <UserNavbar />;
};

export default Navbar;
