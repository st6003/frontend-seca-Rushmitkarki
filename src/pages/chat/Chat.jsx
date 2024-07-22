import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import socketIOClient from "socket.io-client";
import classNames from "classnames";
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
    <div className="flex h-screen" style={{ marginLeft: '250px' }}>
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r overflow-y-auto">
        <button
          className="w-full py-3 px-4 bg-blue-600 text-white font-bold uppercase hover:bg-blue-700"
          onClick={handleGroupChatClick}
        >
          New Group Chat +
        </button>
        <h3 className="font-bold text-lg mt-4 mb-2 px-4">Chat History</h3>
        <ul>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat._id}
                onClick={() => handleChatSelect(chat)}
                className={classNames("cursor-pointer px-4 py-2", {
                  "bg-blue-200": selectedChat && selectedChat._id === chat._id,
                })}
              >
                <div className="text-sm font-semibold">
                  {chat.isGroupChat ? chat.chatName : chat.users[1]?.firstName}
                </div>
                <small className="text-xs">
                  {chat.latestMessage
                    ? `${chat.latestMessage.sender?.firstName}: ${chat.latestMessage.content}`
                    : "No messages yet"}
                </small>
              </li>
            ))
          ) : (
            <li className="px-4 py-2">No chats available</li>
          )}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-blue-700 text-white py-2 px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Connect in Memory Guardian</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search User"
              className="px-4 py-2 rounded-lg border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute right-0 top-0 bottom-0 bg-blue-700 text-white px-4 cursor-pointer"
              onClick={handleSearch}
            >
              {isSearching ? <Skeleton width={20} height={20} /> : "Search"}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          {isLoadingChat ? (
            <Skeleton count={5} />
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender._id === currentUser?._id ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-xs rounded-lg p-2 m-2 ${message.sender._id === currentUser?._id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-4 bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>

      {/* User or Group Details Sidebar */}
      <div className="w-1/4 bg-white border-l overflow-y-auto p-4">
        {selectedChat && (
          <>
            <h3 className="font-bold text-lg">{selectedChat.chatName}</h3>
            {selectedChat.isGroupChat ? (
              <GroupDetailsModal
                groupChat={selectedChat}
                onClose={() => setShowGroupDetails(false)}
                onGroupUpdate={handleGroupUpdate}
              />
            ) : (
              showUserDetails && (
                <div>
                  <h4>User Details</h4>
                  {/* Display user details here */}
                </div>
              )
            )}
            <button
              className="mt-2 bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={handleEyeButtonClick}
            >
              {selectedChat.isGroupChat
                ? "Show Group Details"
                : "Show User Details"}
            </button>
          </>
        )}
      </div>

      {showGroupModal && <GroupModal onClose={closeGroupModal} />}
    </div>
  );
};

export default Chat;
