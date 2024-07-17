import React, { useEffect, useState } from "react";
import { getChat, searchUsers, sendMessage, allMessages, getSingleUser } from "../../apis/api";
import GroupModal from "./GroupModal";
import "./chat.css";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchChats();
    fetchCurrentUser();
    fetchMessages();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await getSingleUser();
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Failed to fetch current user", error);
    }
  };

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

  const fetchMessages = async (chatId) => {
    try {
      const response = await allMessages(chatId);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
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
      setSearchResults([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    try {
      const response = await allMessages(chat._id);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    try {
      const response = await sendMessage({ content: newMessage, chatId: selectedChat._id });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };
  

  return (
    <div className="chat-interface">
      <div className="chat-header bg-sky-900 text-white py-6">
        <h1 className="text-2xl font-bold">Connect in Memory Guardian</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search User"
            className="search-input px-4 py-2 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-btn ml-2 bg-white text-sky-900 px-4 py-2 rounded-full">
            🔍
          </button>
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-list">
          <button className="new-group-btn bg-sky-900 text-white py-2 px-4 rounded-full w-full mb-4" onClick={handleGroupChatClick}>
            New Group Chat +
          </button>
          <h3 className="font-bold mb-2">Chat History</h3>
          <ul>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <li key={chat._id} onClick={() => handleChatSelect(chat)} className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <div className="font-semibold">{chat.isGroupChat ? chat.chatName : chat.users[1]?.firstName}</div>
                  <small className="text-gray-600">
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
              <div key={user._id} onClick={() => handleUserSelect(user)} className="cursor-pointer hover:bg-gray-100 p-2">
                {user.firstName} {user.lastName}
              </div>
            ))}
          </div>
          {selectedChat ? (
            <div className="chat-box">
              <div className="messages">
                {messages.map((msg) => (
                  <div key={msg._id} className={`message ${msg.sender._id === currentUser?._id ? 'sent' : 'received'}`}>
                    <strong>{msg.sender.firstName}: </strong>{msg.content}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="focus:outline-none"
                />
                <button onClick={handleSendMessage} className="focus:outline-none">Send</button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">Click on a user to start chatting</p>
          )}
        </div>
      </div>

      {showGroupModal && <GroupModal closeModal={closeGroupModal} />}
    </div>
  );
};

export default Chat;
