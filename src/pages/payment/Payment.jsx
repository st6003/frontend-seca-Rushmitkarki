import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaMoneyBillWave,
} from 'react-icons/fa';

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    price: '1000', // Default price set to 1000
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex flex-col items-center font-sans p-6">
      <h1 className="text-4xl text-green-500 mb-4">Insure your Health!!</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start w-full max-w-3xl bg-gray-100 p-12 rounded-lg shadow-md space-y-4"
      >
        <label className="flex items-center mb-6 w-full">
          <FaUser className="mr-2 text-gray-600" />
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="ml-2 flex-grow p-2 border rounded"
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaEnvelope className="mr-2 text-gray-600" />
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="ml-2 flex-grow p-2 border rounded"
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaPhone className="mr-2 text-gray-600" />
          Phone:
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="ml-2 flex-grow p-2 border rounded"
          />
        </label>
        <label className="flex items-center mb-6 w-full">
          <FaMoneyBillWave className="mr-2 text-gray-600" />
          Insurance Price: Rs. 1000
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

export default Payment;
