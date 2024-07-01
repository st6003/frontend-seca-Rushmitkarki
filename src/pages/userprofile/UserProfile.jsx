import React, { useState } from 'react';

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    password: '********', // For security reasons, you might want to mask this
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    // Implement your logout logic here
    alert('Logging out...'); // Placeholder for demonstration
  };

  const saveChanges = () => {
    // Implement save changes logic here
    alert('Saving changes...'); // Placeholder for demonstration
    setEditing(false); // Turn off editing mode after saving changes
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          disabled={!editing}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          disabled={!editing}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          disabled={!editing}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
          disabled={!editing}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          disabled={!editing}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-4">
        {editing ? (
          <button
            onClick={saveChanges}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
