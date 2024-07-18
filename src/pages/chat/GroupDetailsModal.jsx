import React, { useState, useEffect } from 'react';
import { renameGroup, addToGroup, removeFromGroup, leaveGroup, searchUsers } from '../../apis/api';
import './groupDetailsModal.css';

const GroupDetailsModal = ({ selectedChat, currentUser, closeModal, onGroupUpdate }) => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedChat) {
      setGroupName(selectedChat.chatName || '');
    }
  }, [selectedChat]);

  if (!selectedChat) {
    return null; // or some placeholder UI
  }

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
      console.error('Failed to search users', error);
      setError('Failed to search users');
    }
  };

  const handleAddUser = (user) => {
    if (!selectedUsers.some(u => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== userId));
  };

  const handleUpdateGroupName = async () => {
    try {
      await renameGroup({ chatId: selectedChat._id, chatName: groupName });
      onGroupUpdate();
    } catch (error) {
      console.error('Failed to update group name', error);
      setError('Failed to update group name');
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
      console.error('Failed to add users to group', error);
      setError('Failed to add users to group');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ chatId: selectedChat._id, userId: currentUser._id });
      onGroupUpdate();
      closeModal();
    } catch (error) {
      console.error('Failed to leave group', error);
      setError('Failed to leave group');
    }
  };

  return (
    <div className="group-details-modal">
      <div className="modal-content">
        <h2>Group List</h2>
        <div className="group-users">
          {selectedChat.users.map(user => (
            <span key={user._id} className="user-tag">
              {user.firstName} {user.lastName} ×
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
        <button onClick={handleUpdateGroupName} className="update-btn">Update</button>
        
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Add User to group"
            className="input-field"
          />
          <button onClick={handleSearch} className="search-btn">🔍</button>
        </div>
        
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map(user => (
              <li key={user._id} onClick={() => handleAddUser(user)}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
        
        {selectedUsers.length > 0 && (
          <div className="selected-users">
            {selectedUsers.map(user => (
              <span key={user._id} className="user-tag">
                {user.firstName} {user.lastName}
                <button onClick={() => handleRemoveUser(user._id)}>×</button>
              </span>
            ))}
          </div>
        )}
        
        <button onClick={handleAddUsersToGroup} className="add-btn">Add Users</button>
        <button onClick={handleLeaveGroup} className="leave-btn">Leave Group</button>
        {error && <p className="error-message">{error}</p>}
        <button onClick={closeModal} className="close-btn">×</button>
      </div>
    </div>
  );
};

export default GroupDetailsModal;
