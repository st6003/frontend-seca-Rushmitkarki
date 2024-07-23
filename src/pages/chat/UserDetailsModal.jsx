import React, { useState } from 'react';
import { renameGroup, addUserToGroup, removeUserFromGroup, leaveGroup, searchUsers } from '../../apis/api';

const UserDetailsModal = ({ onClose, chat, onUpdateGroup }) => {
  const [groupName, setGroupName] = useState(chat.chatName);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleRenameGroup = async () => {
    try {
      await renameGroup({ chatId: chat._id, chatName: groupName });
      onUpdateGroup();
    } catch (error) {
      console.error('Error renaming group:', error);
    }
  };

  const handleAddUser = async (userId) => {
    try {
      await addUserToGroup({ chatId: chat._id, userId });
      onUpdateGroup();
    } catch (error) {
      console.error('Error adding user to group:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeUserFromGroup({ chatId: chat._id, userId });
      onUpdateGroup();
    } catch (error) {
      console.error('Error removing user from group:', error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ chatId: chat._id });
      onUpdateGroup();
      onClose();
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Chat Details</h2>
        {chat.isGroupChat && (
          <>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={handleRenameGroup}>Change Group Name</button>
            <div className="search-users">
              <input
                type="text"
                placeholder="Search Users to Add"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
              {searchResults.map(user => (
                <div key={user._id} onClick={() => handleAddUser(user._id)}>
                  {user.firstName} {user.lastName}
                </div>
              ))}
            </div>
            <h3>Group Members</h3>
            {chat.users.map(user => (
              <div key={user._id}>
                {user.firstName} {user.lastName}
                {user._id !== chat.groupAdmin._id && (
                  <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
                )}
              </div>
            ))}
            <button onClick={handleLeaveGroup}>Leave Group</button>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;