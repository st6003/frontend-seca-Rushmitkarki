import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createGroupChat, getAllUsers, searchUsers } from "../../apis/api";

const GroupModal = ({ closeModal }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError(error.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleUserRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  const handleSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(users);
      return;
    }

    try {
      const response = await searchUsers(term);
      setFilteredUsers(response.data.users);
    } catch (error) {
      console.error("Failed to search users", error);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 2) {
      alert("Please provide a group name and select at least 2 users");
      return;
    }

    try {
      const response = await createGroupChat({
        name: groupName,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      });

      toast.success("Group created successfully!");
      closeModal(); // Closing the modal after successful creation
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <ToastContainer />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Group Chat</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="mb-4 flex flex-wrap">
          {selectedUsers.map((user) => (
            <span
              key={user._id}
              className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
            >
              {user.firstName} {user.lastName}
              <button
                onClick={() => handleUserRemove(user)}
                className="ml-1 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Add Users e.g. John, Piyush, Jane"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border rounded"
          />
          <button
            className="absolute top-0 right-0 mt-2 mr-2"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>
        <div className="user-list max-h-40 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-500">Email: {user.email}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleCreateGroup}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Create Chat
        </button>
        <button
          onClick={closeModal}
          className="w-full bg-gray-300 text-gray-700 p-2 rounded mt-2 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GroupModal;
