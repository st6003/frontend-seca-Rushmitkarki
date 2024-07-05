import axios from "axios";

// Creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Make a config for authorization headers
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Create doctor
export const createDoctor = (data) => Api.post("/api/doctor/create", data);

// Route to fetch all doctors
export const getAllDoctors = () =>
  Api.get("/api/doctor/get_all_doctors", config);

// For single doctor
export const getSingleDoctor = (id) =>
  Api.get(`/api/doctor/get_single_doctor/${id}`, config);

// Update doctor
export const updateDoctor = (id, data) =>
  Api.put(`/api/doctor/update_doctor/${id}`, data, config);

// Delete doctor
export const deleteDoctor = (id) =>
  Api.delete(`/api/doctor/delete_doctor/${id}`, config);

// Pagination
export const doctorPagination = (page, limit) => {
  return Api.get(`/api/doctor/pagination?page=${page}&limit=${limit}`, config);
};

// Get doctor count
export const getDoctorCount = () => {
  return Api.get("/api/doctor/get_doctor_count", config);
};

// Forget password API
export const forgotPasswordApi = (data) => {
  return Api.post("/api/user/forget_password", data);
};

// Reset password API
export const resetPasswordApi = (data) => {
  return Api.post("/api/user/reset_password", data);
};

// Fetch single user
export const getSingleUser = () => Api.get(`/api/user/get_single_user`, config);

// Fetch all users
export const getAllUsers = () => Api.get("/api/user/get_all_users");

// Update user profile
export const updateUserProfile = (id, userData) =>
  Api.put(`/api/user/update_profile`, userData, config);

// favorites
export const addToFavoriteApi = (data) =>
  Api.post("/api/favourite/add", data, config);
