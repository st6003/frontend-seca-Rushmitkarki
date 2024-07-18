import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import socketIOClient from "socket.io-client";
import {
  allMessages,
  createChat,
  getChat,
  getSingleUser,
  searchUsers,
  sendMessage,
} from "../../apis/api";
import GroupDetailsModal from "./GroupDetailsModal";
import GroupModal from "./GroupModal";
import "./chat.css";
const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);

    fetchChats();
    fetchCurrentUser();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("updateChatList", () => {
      fetchChats();
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateChatList");
    };
  }, [socket]);
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
      setIsLoadingChat(true);
      const response = await allMessages(chatId);
      setMessages(response.data);
      setIsLoadingChat(false);
    } catch (error) {
      console.error("Failed to fetch messages", error);
      setIsLoadingChat(false);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchUsers(searchTerm);
      setSearchResults(response.data.users);
      setIsSearching(false);
    } catch (error) {
      console.error("Failed to search users", error);
      setIsSearching(false);
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
      const existingChat = chats.find(
        (chat) =>
          !chat.isGroupChat && chat.users.some((u) => u._id === user._id)
      );

      if (existingChat) {
        setSelectedChat(existingChat);
        await fetchMessages(existingChat._id);
      } else {
        const response = await createChat({ userId: user._id });
        const newChat = response.data;
        setChats([...chats, newChat]);
        setSelectedChat(newChat);
        setMessages([]);
      }

      setSearchResults([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    setShowUserDetails(false);
    await fetchMessages(chat._id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
  
    try {
      const response = await sendMessage({
        content: newMessage,
        chatId: selectedChat._id,
      });
  
      if (response.data) {
        if (socket && socket.connected) {
          socket.emit("sendMessage", { chatId: selectedChat._id, message: response.data });
        }
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage('');
      } else {
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Failed to send message', error);
      // You could add a user-facing error message here
    }
  };

  const toggleUserDetails = () => {
    setShowUserDetails((prevShowUserDetails) => !prevShowUserDetails);
  };

  const handleEyeButtonClick = () => {
    if (selectedChat.isGroupChat) {
      setShowGroupDetails(true);
    } else {
      setShowUserDetails(!showUserDetails);
    }
  };

  const handleGroupUpdate = async () => {
    await fetchChats();
    if (selectedChat) {
      const updatedChat = chats.find((chat) => chat._id === selectedChat._id);
      setSelectedChat(updatedChat);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h1 className="chat-title">Connect in Memory Guardian</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search User"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-list">
          <button className="new-group-btn" onClick={handleGroupChatClick}>
            New Group Chat +
          </button>
          <h3 className="font-bold">Chat History</h3>
          <ul>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <li
                  key={chat._id}
                  onClick={() => handleChatSelect(chat)}
                  className={classNames("chat-item", {
                    active: selectedChat && selectedChat._id === chat._id,
                  })}
                >
                  <div className="chat-item-info">
                    {chat.isGroupChat
                      ? chat.chatName
                      : chat.users[1]?.firstName}
                  </div>
                  <small className="chat-item-preview">
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
          {selectedChat ? (
            <div className="chat-box">
              <div className="chat-box-header">
                <button
                  className="back-btn"
                  onClick={() => setSelectedChat(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="chat-box-title">
                  {selectedChat.isGroupChat
                    ? selectedChat.chatName
                    : selectedChat.users[1]?.firstName}
                </h2>
                <button className="eye-btn" onClick={handleEyeButtonClick}>
                  👁️
                </button>
              </div>
              {!selectedChat.isGroupChat && showUserDetails && (
                <div className="user-details visible">
                  <h3>Receiver Details</h3>
                  <p>
                    {selectedChat.users[1]?.firstName}{" "}
                    {selectedChat.users[1]?.lastName}
                  </p>
                  <p>{selectedChat.users[1]?.email}</p>
                </div>
              )}

              <div
                className={`user-details ${showUserDetails ? "visible" : ""}`}
              >
                <h3>User Details</h3>
                {selectedChat.users.map((user) => (
                  <div key={user._id}>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p>{user.email}</p>
                  </div>
                ))}
              </div>
              <div className="messages">
                {isLoadingChat ? (
                  <Skeleton count={10} />
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={classNames("message", {
                        sent: msg.sender._id === currentUser?._id,
                        received: msg.sender._id !== currentUser?._id,
                      })}
                    >
                      {msg.content}
                    </div>
                  ))
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="message-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="send-btn" onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="welcome-message">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
      {showGroupDetails && selectedChat && selectedChat.isGroupChat && (
        <GroupDetailsModal
          selectedChat={selectedChat}
          currentUser={currentUser}
          closeModal={() => setShowGroupDetails(false)}
          onGroupUpdate={handleGroupUpdate}
        />
      )}
      {showGroupModal && (
        <GroupModal
          currentUser={currentUser}
          closeModal={closeGroupModal}
          onGroupCreate={fetchChats}
          onChatSelect={handleChatSelect}
        />
      )}
    </div>
  );
};

export default Chat;
