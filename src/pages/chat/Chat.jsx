import React, { useEffect, useState } from 'react';
import { getAllUsers, searchUsers, getMessages, sendMessage } from '../../apis/api';
import './chat.css';
import UserNavbar from '../../components/UserNavbar';

const Chat = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users..."); // Debugging log
      const response = await getAllUsers();
      console.log("Users fetched:", response.data.users); // Debugging log
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

  const fetchMessages = async () => {
    try {
      const response = await getMessages(userId, selectedUser._id);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await sendMessage(userId, selectedUser._id, newMessage);
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <UserNavbar />
      <div className="flex-1 ml-64">
        <div className="chat-container h-full">
          <div className="chat-sidebar w-1/4 border-r">
            <div className="header p-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search User"
                className="search-input w-full p-2 mb-2"
              />
              <button onClick={handleSearch} className="new-group-chat w-full bg-blue-500 text-white p-2 rounded">
                New Group Chat +
              </button>
            </div>
            <div className="chat-list overflow-y-auto">
              {users.length === 0 ? (
                <div>No users found</div>
              ) : (
                users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    className={`chat-list-item ${selectedUser && selectedUser._id === user._id ? 'selected' : ''}`}
                  >
                    <div className="chat-user-name">{user.name}</div>
                    <div className="chat-last-message">{user.lastMessage}</div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="chat-content-container flex-1 p-4">
            {selectedUser ? (
              <div className="chat-content h-full flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4">
                  {messages.map((message) => (
                    <div key={message._id} className="mb-2">
                      <p>{message.message}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="mt-2 bg-blue-500 text-white p-2 rounded"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="chat-placeholder flex items-center justify-center h-full text-gray-500">
                Click on a user to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
