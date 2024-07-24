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
    const userIds = selectedUsers.map(user => user._id);
    onCreateGroup(groupName, userIds);
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
        <input
          type="text"
          placeholder="Search Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="search-results">
          {searchResults.map(user => (
            <div key={user._id} className="search-result-item" onClick={() => handleSelectUser(user)}>
              <img src={user.avatar || 'default-avatar.png'} alt={user.firstName} className="user-avatar" />
              <div>
                <div>{user.firstName} {user.lastName}</div>
                <div className="user-email">Email: {user.email}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="selected-users">
          {selectedUsers.map(user => (
            <span key={user._id} className="user-tag">
              {user.firstName} {user.lastName}
              <button onClick={() => handleRemoveUser(user._id)}>×</button>
            </span>
          ))}
        </div>
        <button className="create-btn" onClick={handleCreateGroup}>Create Group</button>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
