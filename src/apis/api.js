import axios from "axios";

//creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
// make a config
const config={
  headers:{
    authorization : `Bearer ${localStorage.getItem("token")}`
  }
}

export const registerUserApi = (data) => Api.post("/api/user/create", data);

//Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);
// Create doctor
export const createDoctor = (data) => Api.post("/api/doctor/create", data);
//Route to fetch all doctor
export const getAllDoctors = () => Api.get("/api/doctor/get_all_doctors",config);
// FOr single doctor
export const getSingleDoctor = (id) => Api.get(`/api/doctor/get_single_doctor/${id}`);
// Update doctor
export const updateDoctor = (id, data) => Api.put(`/api/doctor/update_doctor/${id}`, data);
// Delete doctor
export const deleteDoctor = (id) => Api.delete(`/api/doctor/delete_doctor/${id}`);
// pagination
export const doctorPagination = (id) => {
  return Api.get(`/api/doctor/pagination/?page=${id}`,config);

};
// forget password api
export const forgotPasswordApi = (data) =>{
  return Api.post("/api/user/forget_password",data);
};
// reset password api
export const resetPasswordApi = (data) =>{
  return Api.post("/api/user/reset_password",data);
};
