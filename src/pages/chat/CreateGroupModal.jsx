import React, { useState } from 'react';
import { searchUsers } from '../../apis/api';

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSelectUser = (user) => {
    if (!selectedUsers.find(u => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== userId));
  };

  const handleCreateGroup = () => {
    if (groupName && selectedUsers.length >= 2) {
      onCreateGroup(groupName, selectedUsers.map(user => user._id));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="search-users">
          <input
            type="text"
            placeholder="Search Users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {searchResults.map(user => (
            <div key={user._id} onClick={() => handleSelectUser(user)}>
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
        <div className="selected-users">
          {selectedUsers.map(user => (
            <div key={user._id}>
              {user.firstName} {user.lastName}
              <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
            </div>
          ))}
        </div>
        <button onClick={handleCreateGroup}>Create Group</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateGroupModal;