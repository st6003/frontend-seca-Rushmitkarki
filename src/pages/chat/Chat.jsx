import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatArea from './ChatArea';
import CreateGroupModal from './CreateGroupModal';
import UserDetailsModal from './UserDetailsModal';
import { getChat, createChat, createGroupChat, sendMessage, allMessages } from '../../apis/api';
import './chat.css';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]); // Ensure chats is always an array
  const [messages, setMessages] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const response = await getChat();
      setChats(response.data || []); // Fallback to an empty array if response.data is undefined
    } catch (error) {
      console.error('Error fetching chats:', error);
      setChats([]); // Set chats to an empty array in case of an error
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await allMessages(chatId);
      setMessages(response.data || []); // Fallback to an empty array if response.data is undefined
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]); // Set messages to an empty array in case of an error
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleCreateChat = async (userId) => {
    try {
      const response = await createChat({ userId });
      setChats([...chats, response.data]); // Add the new chat to the chats array
      setSelectedChat(response.data);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleCreateGroup = async (groupName, users) => {
    try {
      const response = await createGroupChat({ name: groupName, users });
      setChats([...chats, response.data]); // Add the new group chat to the chats array
      setSelectedChat(response.data);
      setShowCreateGroupModal(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleSendMessage = async (content) => {
    try {
      const response = await sendMessage({ content, chatId: selectedChat._id });
      setMessages([...messages, response.data]); // Add the new message to the messages array
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader onCreateChat={handleCreateChat} />
      <div className="chat-body">
        <ChatList
          chats={chats}
          onSelectChat={handleSelectChat}
          onCreateGroup={() => setShowCreateGroupModal(true)}
        />
        <ChatArea
          selectedChat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          onShowUserDetails={() => setShowUserDetailsModal(true)}
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
        />
      )}
    </div>
  );
};

export default Chat;