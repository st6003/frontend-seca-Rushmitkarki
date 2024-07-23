import React, { useState } from 'react';
import { searchUsers } from '../../apis/api';

const ChatHeader = ({ onCreateChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setSearchResults(response.data.users || []); // Fallback to an empty array if response.data.users is undefined
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="chat-header">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search User"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(user => (
            <div key={user._id} onClick={() => onCreateChat(user._id)}>
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
      )}
      <h1 className="app-title">Talk-A-Tive</h1>
      <div className="user-info">
        <div className="notification-badge">2</div>
        <img src="user-avatar.jpg" alt="User" className="user-avatar" />
      </div>
    </div>
  );
};

export default ChatHeader;
