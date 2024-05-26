import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 

// calling the api

export const registerUserApi = (data) => api.post("/api/user/create", data);
export const loginUserApi = (data) => api.post("/api/user/login", data);
