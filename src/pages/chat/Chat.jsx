import classNames from "classnames";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import socketIOClient from "socket.io-client";
import typingAnimation from "./typing-animation.json";

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

const isSameSenderMargin = (messages, message, index, userId) => {
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === message.sender._id &&
    messages[index].sender._id !== userId
  ) {
    return 33;
  } else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== message.sender._id &&
      messages[index].sender._id !== userId) ||
    (index === messages.length - 1 && messages[index].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

const isSameSender = (messages, message, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== message.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

const isSameUser = (messages, message, index) => {
  return index > 0 && messages[index - 1].sender._id === message.sender._id;
};

const getSenderName = (loggedUser, users) => {
  if (!users || users.length < 2) return "";
  return users[0]?._id === loggedUser?._id
    ? users[1].firstName
    : users[0].firstName;
};

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
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState({});

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
  // notification
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (!selectedChat || message.chat !== selectedChat._id) {
        setUnreadMessages((prev) => ({
          ...prev,
          [message.chat]: (prev[message.chat] || 0) + 1,
        }));
        setUnreadCount((prev) => prev + 1);
      }
    });

    socket.on("updateChatList", () => {
      fetchChats();
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateChatList");
    };
  }, [socket, selectedChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on("typing", ({ chatId }) => {
      if (selectedChat && selectedChat._id === chatId) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", ({ chatId }) => {
      if (selectedChat && selectedChat._id === chatId) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, selectedChat]);

  const handleTyping = () => {
    if (!socket || !selectedChat) return;

    socket.emit("typing", { chatId: selectedChat._id });

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength) {
        socket.emit("stopTyping", { chatId: selectedChat._id });
      }
    }, timerLength);
  };
  // fetch user
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
        const sortedChats = response.data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setChats(sortedChats);
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

    setUnreadMessages((prev) => {
      const newUnreadMessages = { ...prev };
      delete newUnreadMessages[chat._id];
      return newUnreadMessages;
    });
    setUnreadCount((prev) =>
      Math.max(0, prev - (unreadMessages[chat._id] || 0))
    );
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
          socket.emit("sendMessage", {
            chatId: selectedChat._id,
            message: response.data,
          });
        }
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      } else {
        console.error("Invalid response from server");
      }
    } catch (error) {
      console.error("Failed to send message", error);
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
        <div className="header-actions">
          <div className="notification-bell">
            <span className="bell-icon">🔔</span>
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
          </div>
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
            {isSearching && <div className="searching">Searching...</div>}
            {searchResults.length > 0 && (
              <div className="search-results">
                <h3>Search Results</h3>
                <ul>
                  {searchResults.map((user) => (
                    <li key={user._id} onClick={() => handleUserSelect(user)}>
                      {user.firstName} {user.lastName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-list">
          <button className="new-group-btn" onClick={handleGroupChatClick}>
            New Group Chat +
          </button>
          <h3 className="font-bold">Chat History</h3>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat._id}
                onClick={() => handleChatSelect(chat)}
                className={classNames("chat-item", {
                  active: selectedChat && selectedChat._id === chat._id,
                })}
              >
                <div className="chat-item-info">
                  {chat.isGroupChat ? chat.chatName : chat.users[1]?.firstName}
                  {unreadMessages[chat._id] > 0 && (
                    <span className="unread-count">
                      {unreadMessages[chat._id]}
                    </span>
                  )}
                </div>
                <small className="chat-item-preview">
                  {chat.latestMessage
                    ? `${chat.latestMessage.sender?.firstName}: ${chat.latestMessage.content}`
                    : "No messages yet"}
                </small>
              </li>
            ))}
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
                  <h3>Receiver Details:</h3>
                  <p>
                    {selectedChat.users[1]?.firstName}{" "}
                    {selectedChat.users[1]?.lastName}
                  </p>
                </div>
              )}

              <div
                className={`user-details ${showUserDetails ? "visible" : ""}`}
              >
                <h3>User Details:</h3>
                {selectedChat.users.map((user) => (
                  <div key={user._id}>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                ))}
              </div>
              <div className="messages">
                {isLoadingChat ? (
                  <Skeleton count={5} height={40} />
                ) : (
                  <div className="chat-box-messages">
                    {messages.map((message, index) => (
                      <div
                        key={message._id}
                        className={classNames("message", {
                          "my-message": message.sender._id === currentUser?._id,
                          "their-message":
                            message.sender._id !== currentUser?._id,
                        })}
                        style={{
                          marginLeft:
                            message.sender._id === currentUser._id
                              ? "auto"
                              : "0",
                          marginRight:
                            message.sender._id !== currentUser._id
                              ? "auto"
                              : "0",
                          marginBottom: isSameSenderMargin(
                            messages,
                            message,
                            index,
                            currentUser._id
                          ),
                          marginTop: isSameUser(messages, message, index)
                            ? 3
                            : 10,
                        }}
                      >
                        {(isSameSender(
                          messages,
                          message,
                          index,
                          currentUser._id
                        ) ||
                          isLastMessage(messages, index, currentUser._id)) && (
                          <div className="message-sender">
                            {message.sender.firstName}
                          </div>
                        )}
                        <div className="message-content">{message.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="message-input"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                />
                {isTyping && (
                  <div className="typing-indicator">
                    <Lottie animationData={typingAnimation} loop={true} />
                  </div>
                )}
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
