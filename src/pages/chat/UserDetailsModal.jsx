import React, { useState, useEffect } from 'react';
import { renameGroup, addUserToGroup, removeUserFromGroup, leaveGroup, searchUsers } from '../../apis/api';

const UserDetailsModal = ({ onClose, chat, onUpdateGroup, currentUser }) => {
  const [groupName, setGroupName] = useState(chat ? chat.chatName : '');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (chat) {
      setGroupName(chat.chatName);
    }
  }, [chat]);

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

  if (!chat || !chat.users) {
    return null;
  }

  return (
    <div className="modal">
    <div className="modal-content">
      <h2>{chat.chatName || 'Chat Details'}</h2>
      <div className="selected-users">
        {chat.users.map(user => user && (
          <span key={user._id} className="user-tag">
            {user.firstName} {user.lastName}
            {chat.isGroupChat && user._id !== chat.groupAdmin?._id && user._id !== currentUser?._id && (
              <button onClick={() => handleRemoveUser(user._id)}>×</button>
            )}
          </span>
        ))}
      </div>
        {chat.isGroupChat && (
          <>
            <input
              type="text"
              placeholder="Chat Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button className="update-btn" onClick={handleRenameGroup}>Update</button>
            <input
              type="text"
              placeholder="Add User to group"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="search-results">
              {searchResults.map(user => user ? (
                <div key={user._id} className="search-result-item" onClick={() => handleAddUser(user._id)}>
                  <img src={user.avatar || 'default-avatar.png'} alt={user.firstName} className="user-avatar" />
                  <div>
                    <div>{user.firstName} {user.lastName}</div>
                    <div className="user-email">Email: {user.email}</div>
                  </div>
                </div>
              ) : null)}
            </div>
            <button className="leave-group-btn" onClick={handleLeaveGroup}>Leave Group</button>
          </>
        )}
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
