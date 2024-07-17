import React, { useEffect, useState } from "react";
import { getChat, searchUsers } from "../../apis/api";
import GroupModal from "./GroupModal";
import "./chat.css";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await getChat();
      if (response.data && Array.isArray(response.data)) {
        setChats(response.data);
      } else {
        setChats([]);
      }
    } catch (error) {
      console.error("Failed to fetch chats", error);
      setChats([]);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await searchUsers(searchTerm);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Failed to search users", error);
    }
  };

  const handleGroupChatClick = () => {
    setShowGroupModal(true);
  };

  const closeGroupModal = () => {
    setShowGroupModal(false);
  };

  const handleUserSelect = async (user) => {
    try {
      // Implement your logic for creating a chat with selected user here if needed
      console.log("Selected user:", user);
    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h1>Connect in Memory Guardian</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search User"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-btn">
            🔍
          </button>
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-list">
          <button className="new-group-btn" onClick={handleGroupChatClick}>
            New Group Chat +
          </button>
          <h3>Chat History</h3>
          <ul>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <li key={chat._id}>
                  {chat.isGroupChat ? chat.chatName : chat.users[1]?.firstName}
                  <br />
                  <small>
                    {chat.latestMessage
                      ? `${chat.latestMessage.sender?.firstName}: ${chat.latestMessage.content}`
                      : "No messages yet"}
                  </small>
                </li>
              ))
            ) : (
              <li>No chats available</li>
            )}
          </ul>
        </div>
        <div className="chat-area">
          <div className="search-results">
            {searchResults.map((user) => (
              <div key={user._id} onClick={() => handleUserSelect(user)}>
                {user.firstName} {user.lastName}
              </div>
            ))}
          </div>
          <p>Click on a user to start chatting</p>
        </div>
      </div>

      {showGroupModal && <GroupModal closeModal={closeGroupModal} />}
    </div>
  );
};

export default Chat;
