import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {
  addToGroup,
  leaveGroup,
  removeFromGroup,
  renameGroup,
  searchUsers,
} from "../../apis/api";
import "./groupDetailsModal.css";

const ENDPOINT = "http://localhost:5000"; // Adjust this endpoint as needed

const GroupDetailsModal = ({
  selectedChat,
  currentUser,
  closeModal,
  onGroupUpdate,
}) => {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = socketIOClient(ENDPOINT);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      setGroupName(selectedChat.chatName || "");
    }
  }, [selectedChat]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchTerm);
      setSearchResults(results.data.users);
    } catch (error) {
      console.error("Failed to search users", error);
      setError("Failed to search users");
    }
  };

  const handleAddUser = (user) => {
    if (!selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeFromGroup({ chatId: selectedChat._id, userId });
      onGroupUpdate();
    } catch (error) {
      console.error("Failed to remove user from group", error);
      setError("Failed to remove user from group");
    }
  };

  const handleUpdateGroupName = async () => {
    try {
      await renameGroup({ chatId: selectedChat._id, chatName: groupName });
      onGroupUpdate();
    } catch (error) {
      console.error("Failed to update group name", error);
      setError("Failed to update group name");
    }
  };

  const handleAddUsersToGroup = async () => {
    try {
      for (const user of selectedUsers) {
        await addToGroup({ chatId: selectedChat._id, userId: user._id });
      }
      onGroupUpdate();
      closeModal();
    } catch (error) {
      console.error("Failed to add users to group", error);
      setError("Failed to add users to group");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ chatId: selectedChat._id });
      onGroupUpdate();
      closeModal();
      socket.emit("leaveGroup", { chatId: selectedChat._id, userId: currentUser._id });
    } catch (error) {
      console.error("Failed to leave group", error);
      setError("Failed to leave group");
    }
  };

  return (
    <div className="group-details-modal">
      <div className="modal-content">
        <h2>Group List</h2>
        <div className="group-users">
          {selectedChat.users.map((user) => (
            <span key={user._id} className="user-tag">
              {user.firstName} {user.lastName}
              {user._id !== currentUser._id && (
                <button onClick={() => handleRemoveUser(user._id)}>×</button>
              )}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Chat Name"
          className="input-field"
        />
        <button onClick={handleUpdateGroupName} className="update-btn">
          Update
        </button>

        <div className="search-container">
          <input
            type="text" 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Add User to group"
            className="input-field"
          />
          <button onClick={handleSearch} className="search-btn">
            🔍
          </button>
        </div>

        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((user) => (
              <li key={user._id} onClick={() => handleAddUser(user)}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}

        {selectedUsers.length > 0 && (
          <div className="selected-users">
            {selectedUsers.map((user) => (
              <span key={user._id} className="user-tag">
                {user.firstName} {user.lastName}
                <button onClick={() => handleRemoveUser(user._id)}>×</button>
              </span>
            ))}
          </div>
        )}

        <button onClick={handleAddUsersToGroup} className="add-btn">
          Add Users
        </button>
        <button onClick={handleLeaveGroup} className="leave-btn">
          Leave Group
        </button>
        {error && <p className="error-message">{error}</p>}
        <button onClick={closeModal} className="close-btn">
          ×
        </button>
      </div>
    </div>
  );
};

export default GroupDetailsModal;
