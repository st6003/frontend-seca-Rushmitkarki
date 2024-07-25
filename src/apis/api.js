import axios from "axios";

// Creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization header to every request
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Create doctor
export const createDoctor = (data) => Api.post("/api/doctor/create", data);

// Route to fetch all doctors
export const getAllDoctors = () => Api.get("/api/doctor/get_all_doctors");

// For single doctor
export const getSingleDoctor = (id) =>
  Api.get(`/api/doctor/get_single_doctor/${id}`);

// Update doctor
export const updateDoctor = (id, data) =>
  Api.put(`/api/doctor/update_doctor/${id}`, data);

// Delete doctor
export const deleteDoctor = (id) =>
  Api.delete(`/api/doctor/delete_doctor/${id}`);

// Pagination
export const doctorPagination = (
  page,
  limit,
  searchQuery = "",
  sortOrder = "asc"
) => {
  const query = `?page=${page}&limit=${limit}&q=${searchQuery}&sort=${sortOrder}`;
  return Api.get(`/api/doctor/pagination${query}`);
};

// Get doctor count
export const getDoctorCount = () => Api.get("/api/doctor/get_doctor_count");

// Forget password API
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forget_password", data);

// Reset password API
export const resetPasswordApi = (data) =>
  Api.post("/api/user/reset_password", data);

// Fetch single user
export const getSingleUser = () => Api.get(`/api/user/get_single_user`);

// Fetch all users
export const getAllUsers = () => Api.get("/api/user/get_all_users");
export const deleteUser = (userId) =>
  Api.delete(`/api/user/delete_user/${userId}`);

// Update user profile
export const updateUserProfile = (id, userData) =>
  Api.put(`/api/user/update_profile`, userData);

// Favorites
export const addFavoriteApi = (data) => Api.post("/api/favourite/add", data);
export const getUserFavoritesApi = () => Api.get("/api/favourite/all");
export const removeFavoriteApi = (id) => Api.delete(`/api/favourite/delete/${id}`);
// Appointment doctors
export const appointmentDoctor = (data) =>
  Api.post("/api/booking/create_appointments", data);
export const getUsersWithAppointments = () =>
  Api.get("/api/booking/users_with_appointments");
export const deleteAppointment = (id) =>
  Api.delete(`/api/booking/delete_appointments/${id}`);

export const approveAppointment = (id) =>
  Api.put(`/api/booking/approve_appointment/${id}`);
export const getUserAppointments = () =>
  Api.get("/api/booking/user_appointments");

export const cancelAppointment = (id) =>
  Api.delete(`/api/booking/cancel_appointment/${id}`);

// For admin chart
export const getDashboardStats = () => Api.get("/api/admin/dashboard_stats");

// Search
export const searchDoctor = (query) =>
  Api.get(`/api/doctor/search?query=${query}`);
export const searchUsers = (query) =>
  Api.get(`/api/user/search_users?query=${query}`);

// Insurance
export const createInsurance = (data) =>
  Api.post("/api/insurance/create", data);
export const getInsurance = () => Api.get("/api/insurance/get_all_insurances");
export const deleteInsurance = (id) =>
  Api.delete(`/api/insurance/delete_insurance/${id}`);
export const updateInsurance = (id, data) =>
  Api.put(`/api/insurance/update_insurance/${id}`, data);
export const getSingleInsurance = (id) =>
  Api.get(`/api/insurance/get_single_insurance/${id}`);

// Khalti
export const initializeKhaltiPayment = (data) =>
  Api.post("/api/khalti/initialize-khalti", data);

// Chat
export const createChat = (data) => Api.post("/api/chat/create", data);
export const getChat = () => Api.get("/api/chat/fetch");
export const createGroupChat = (data) => Api.post("/api/chat/group", data);
export const renameGroup = (data) => Api.put("/api/chat/rename", data);
export const addUserToGroup = (data) => Api.put("/api/chat/groupadd", data);
export const removeUserFromGroup = (data) => Api.put("/api/chat/groupremove", data);
export const leaveGroup = (data) => Api.put("/api/chat/groupleave", data);
export const sendMessage = (data) => Api.post("/api/message/send", data);
export const allMessages = (id) => Api.get(`/api/message/${id}`);
// update group
export const updateGroupChat = (data) =>
  Api.put(`/api/chat/updategroup`, data);


// review and rating
// Add these API calls to your api.js file
export const addReviewApi = (data) => Api.post("/api/rating/add", data);
export const getDoctorReviews = (doctorId) => Api.get(`/api/rating/doctor/${doctorId}`);
