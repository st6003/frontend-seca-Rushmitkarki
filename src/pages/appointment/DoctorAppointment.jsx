import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClipboard,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { appointmentDoctor } from "../../apis/api";

const DoctorAppointment = () => {
  const [today] = useState(new Date().toISOString().split("T")[0]);
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    phoneNumber: "",
    email: "",
    appointmentDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await appointmentDoctor(formData);
      console.log("Server Response:", response);
      alert("Appointment booked successfully");
      setFormData({
        patientName: "",
        appointmentDate: "",
        phoneNumber: "",
        email: "",
        appointmentDescription: "",
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment");
    }
  };

  return (
    <div className="flex flex-col items-center font-sans p-6">
      <h1 className="text-4xl text-red-500 mb-4">Appointment Form</h1>
      <p className="mb-6">Book your favourite doctor now!!</p>

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
            value={formData.patientName}
            onChange={handleChange}
            required
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
            required
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
            required
          />
        </label>
        <label className="flex items-start mb-6 w-full">
          <FaClipboard className="mr-2 mt-1 text-gray-600" />
          Why do you want an appointment?
          <textarea
            name="appointmentDescription" // Changed from description to appointmentDescription
            className="ml-2 flex-grow p-2 border rounded h-32"
            value={formData.appointmentDescription} // Changed from formData.description to formData.appointmentDescription
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className="self-center bg-sky-500 text-white px-8 py-3 rounded hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorAppointment;
