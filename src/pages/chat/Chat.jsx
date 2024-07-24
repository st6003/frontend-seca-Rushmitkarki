import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatArea from './ChatArea';
import CreateGroupModal from './CreateGroupModal';
import UserDetailsModal from './UserDetailsModal';
import { getChat, createChat, createGroupChat, sendMessage, allMessages } from '../../apis/api';
import './chat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(
    JSON.parse(localStorage.getItem('showUserDetailsModal')) || false
  );
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchChats();
    socket.on('messageReceived', (newMessage) => {
      if (selectedChat && selectedChat._id === newMessage.chatId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
    return () => {
      socket.off('messageReceived');
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
      socket.emit('joinChat', selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    localStorage.setItem('showUserDetailsModal', JSON.stringify(showUserDetailsModal));
  }, [showUserDetailsModal]);

  const fetchChats = async () => {
    try {
      const response = await getChat();
      setChats(response.data || []);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setChats([]);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await allMessages(chatId);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowUserDetailsModal(false);
  };

  const handleCreateChat = async (userId) => {
    try {
      const response = await createChat({ userId });
      setChats([...chats, response.data]);
      setSelectedChat(response.data);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleCreateGroup = async (groupName, users) => {
    try {
      const response = await createGroupChat({ name: groupName, users });
      setChats([...chats, response.data]);
      setSelectedChat(response.data);
      setShowCreateGroupModal(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleSendMessage = async (content) => {
    try {
      const response = await sendMessage({ content, chatId: selectedChat._id });
      setMessages([...messages, response.data]);
      socket.emit('newMessage', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCreateGroupClick = () => {
    setShowCreateGroupModal(true);
  };

  const handleShowUserDetails = () => {
    setShowUserDetailsModal(true);
  };

  return (
    <div className="chat-container">
      <ChatHeader onCreateChat={handleCreateChat} />
      <div className="chat-body">
        <ChatList
          chats={chats}
          onSelectChat={handleSelectChat}
          onCreateGroup={handleCreateGroupClick}
        />
        <ChatArea
          selectedChat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          onShowUserDetails={handleShowUserDetails}
          currentUser={currentUser}
        />
      </div>
      {showCreateGroupModal && (
        <CreateGroupModal
          onClose={() => setShowCreateGroupModal(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
      {showUserDetailsModal && selectedChat && (
        <UserDetailsModal
          onClose={() => setShowUserDetailsModal(false)}
          chat={selectedChat}
          onUpdateGroup={fetchChats}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Chat;