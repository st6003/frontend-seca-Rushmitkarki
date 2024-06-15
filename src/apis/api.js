import axios from "axios";

//creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const registerUserApi = (data) => Api.post("/api/user/create", data);

//Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);
