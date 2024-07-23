import React, { useState } from 'react';
import { searchUsers } from '../../apis/api';

const ChatHeader = ({ onCreateChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      console.log('Search results:', response.data); // Debugging info
      setSearchResults(response.data.users || []); // Fallback to an empty array if response.data.users is undefined
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      // Clear search results
      setSearchResults([]);
      
      // Initiate chat with selected user
      await onCreateChat(userId);
    } catch (error) {
      console.error('Error handling user click:', error);
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
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(user => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className="search-result-item"
            >
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
