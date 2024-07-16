import React, { useEffect, useState } from 'react';
import { getAllUsers, searchUsers } from '../../apis/api';
import './chat.css';

const Chat = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        {/* Sidebar content here */}
      </div>
      <div className="chat-content-container">
        <div className="header">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search User"
            className="search-input"
          />
          <button className="new-group-chat">New Group Chat +</button>
        </div>
        <div className="chat-list">
          {users.map((user) => (
            <div
              key={user._id}
              className={`chat-list-item ${selectedUser && selectedUser._id === user._id ? 'selected' : ''}`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="chat-user-name">{`${user.firstName} ${user.lastName}`}</div>
              <div className="chat-last-message">Last message preview...</div>
            </div>
          ))}
        </div>
        <div className="chat-window">
          {selectedUser ? (
            <div className="chat-content">
              {/* Render chat messages here */}
            </div>
          ) : (
            <div className="chat-placeholder">Click on a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
