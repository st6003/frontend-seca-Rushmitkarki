import React from "react";

function userRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user != null ? <Outlet /> : <Navigate to={"/login"} />;
}

export default userRoutes;