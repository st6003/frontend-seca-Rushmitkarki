import React, { useState } from "react";
import { searchUsers } from "../../apis/api";

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSelectUser = (user) => {
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  const handleCreateGroup = () => {
    const userIds = selectedUsers.map((user) => user._id);
    onCreateGroup(groupName, userIds);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Search Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="max-h-40 overflow-y-auto mb-4">
          {searchResults.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectUser(user)}
            >
              <img
                src={user.avatar || "default-avatar.png"}
                alt={user.firstName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedUsers.map((user) => (
            <span
              key={user._id}
              className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
            >
              {user.firstName} {user.lastName}
              <button
                onClick={() => handleRemoveUser(user._id)}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
