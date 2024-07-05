import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClipboard,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const DoctorAppointment = () => {
  const [today] = useState(new Date().toISOString().split("T")[0]); // Get today's date in YYYY-MM-DD format

  return (
    <div className="flex flex-col items-center font-sans p-6">
      <h1 className="text-4xl text-red-500 mb-4">Appointment Form</h1>
      <p className="mb-6">Book your favourite doctor now!!</p>

      <form className="flex flex-col items-start w-full max-w-3xl bg-gray-100 p-12 rounded-lg shadow-md">
        <label className="flex items-center mb-6 w-full">
          <FaUser className="mr-2 text-gray-600" />
          Name:
          <input
            type="text"
            name="name"
            className="ml-2 flex-grow p-2 border rounded"
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaCalendarAlt className="mr-2 text-gray-600" />
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            className="ml-2 flex-grow p-2 border rounded"
            min={today} // Set the minimum date to today
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaPhone className="mr-2 text-gray-600" />
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            className="ml-2 flex-grow p-2 border rounded"
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaEnvelope className="mr-2 text-gray-600" />
          Email:
          <input
            type="email"
            name="email"
            className="ml-2 flex-grow p-2 border rounded"
          />
        </label>
        <label className="flex items-start mb-6 w-full">
          <FaClipboard className="mr-2 mt-1 text-gray-600" />
          Why do you want an appointment?
          <textarea
            name="description"
            className="ml-2 flex-grow p-2 border rounded h-32"
          />
        </label>

        <button
          type="submit"
          className="self-center bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorAppointment;
