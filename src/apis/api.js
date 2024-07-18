import axios from "axios";
import App from "../App";

// Creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
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
export const doctorPagination = (page, limit, searchQuery = '', sortOrder = 'asc') => {
  const query = `?page=${page}&limit=${limit}&q=${searchQuery}&sort=${sortOrder}`;
  return Api.get(`/api/doctor/pagination${query}`, config);
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
export const getAllUsers = () => Api.get("/api/user/get_all_users",config);
// delete user
export const deleteUser = (id) => Api.delete(`/api/user/delete_user/${id}`,config);

// Update user profile
export const updateUserProfile = (id, userData) =>
  Api.put(`/api/user/update_profile`, userData, config);

// favorites
export const addToFavoriteApi = (data) =>
  Api.post("/api/favourite/add", data, config);

// appointment doctors
export const appointmentDoctor = (data) =>
  Api.post("/api/booking/create_appointments", data);
// fetch all user data
export const getUsersWithAppointments = () =>
  Api.get("/api/booking/users_with_appointments");
// delete appointment
export const deleteAppointment = (id) =>
  Api.delete(`/api/booking/delete_appointments/${id}`, config);

// for adminchart
export const getDashboardStats = async()=>{
  return Api.get("/api/admin/dashboard_stats");
}
// search
export const searchDoctor = (query) =>
  Api.get(`/api/doctor/search?query=${query}`, config);

// search user
export const searchUsers = (query)=>
  Api.get(`/api/user/search_users?query=${query}`, config);


// insurance
export const createInsurance = (data) => Api.post("/api/insurance/create", data, config);
export const getInsurance = () => Api.get("/api/insurance/get_all_insurances", config);
export const deleteInsurance = (id) => Api.delete(`/api/insurance/delete_insurance/${id}`, config);
export const updateInsurance = (id, data) => Api.put(`/api/insurance/update_insurance/${id}`, data, config);
export const getSingleInsurance = (id) => Api.get(`/api/insurance/get_single_insurance/${id}`, config);


// khalti
export const initializeKhaltiPayment = (data) =>
  Api.post("/api/khalti/initialize-khalti", data);


// chat
// create chat
export const createChat = (data) => Api.post("/api/chat/create", data, config);
// get all chat
export const getChat = () => Api.get("/api/chat/fetch", config);
// groupchat
export const createGroupChat = (data) => Api.post("/api/chat/group", data, config);
// rename group
export const renameGroup = (data) => Api.put("/api/chat/rename", data, config);
// add to group
export const addToGroup = (data) => Api.put("/api/chat/groupadd", data, config);
// remove from group
export const removeFromGroup = (data) => Api.put("/api/chat/groupremove", data, config);

// leave group
export const leaveGroup = (data) => Api.put("/api/chat/groupleave", data, config);

// sendMessage function
export const sendMessage = (data) => Api.post("/api/message/send", data, config);

// allMessages function
export const allMessages = (id) => Api.get(`/api/message/${id}`, config);