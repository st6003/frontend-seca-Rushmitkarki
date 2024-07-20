// utils.js
export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
  
    if (!user || user === "undefined") {
      return null;
    }
  
    try {
      // Ensure `user` is a valid JSON string before parsing
      if (typeof user === "string" && user !== "undefined") {
        return JSON.parse(user);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  
    return null;
  };
  