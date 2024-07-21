import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClipboard,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import {
  appointmentDoctor,
  getSingleUser,
  getUserAppointments,
} from "../../apis/api";

const DoctorAppointment = () => {
  const [today] = useState(new Date().toISOString().split("T")[0]);
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    phoneNumber: "",
    email: "",
    appointmentDescription: "",
  });
  const [canBookAppointment, setCanBookAppointment] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await getSingleUser();
        const { firstName, phone, email } = userResponse.data.user;
        setFormData((prevFormData) => ({
          ...prevFormData,
          patientName: firstName,
          phoneNumber: phone,
          email: email,
        }));

        // Check if the user has any pending or approved appointments
        const appointmentResponse = await getUserAppointments();
        const userAppointments = appointmentResponse.data.data;

        const hasPendingOrApproved = userAppointments.some(
          (app) => app.status === "pending" || app.status === "approved"
        );

        setCanBookAppointment(!hasPendingOrApproved);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentDoctor(formData);
      alert("Appointment booked successfully");

      // Reset form and re-fetch appointments
      setFormData({
        patientName: "",
        appointmentDate: "",
        phoneNumber: "",
        email: "",
        appointmentDescription: "",
      });

      // Re-check appointment status
      const appointmentResponse = await getUserAppointments();
      const userAppointments = appointmentResponse.data.data;
      const lastAppointment =
        userAppointments.length > 0
          ? userAppointments[userAppointments.length - 1]
          : null;
      setCanBookAppointment(
        !lastAppointment || lastAppointment.status === "approved"
      );
    } catch (error) {
      console.error("wait for a moment:", error);
      alert("Your previous request is pending: wait until admin accept it ");
    }
  };

  return (
    <div className="flex flex-col items-center font-sans p-6">
      <h1 className="text-4xl text-red-500 mb-4">Appointment Form</h1>
      <p className="mb-6">Book your favorite doctor now!</p>

      <form
        className="flex flex-col items-start w-full max-w-3xl bg-gray-100 p-12 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <label className="flex items-center mb-6 w-full">
          <FaUser className="mr-2 text-gray-600" />
          Name:
          <input
            type="text"
            name="patientName"
            className="ml-2 flex-grow p-2 border rounded"
            value={formData.cc}
            onChange={handleChange}
            disabled
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaCalendarAlt className="mr-2 text-gray-600" />
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            className="ml-2 flex-grow p-2 border rounded"
            min={today}
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaPhone className="mr-2 text-gray-600" />
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            className="ml-2 flex-grow p-2 border rounded"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaEnvelope className="mr-2 text-gray-600" />
          Email:
          <input
            type="email"
            name="email"
            className="ml-2 flex-grow p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </label>
        <label className="flex items-start mb-6 w-full">
          <FaClipboard className="mr-2 mt-1 text-gray-600" />
          Why do you want an appointment?
          <textarea
            name="appointmentDescription"
            className="ml-2 flex-grow p-2 border rounded"
            value={formData.appointmentDescription}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            !canBookAppointment ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!canBookAppointment}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default DoctorAppointment;
