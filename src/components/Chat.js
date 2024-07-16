// components/Chat.js

import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../api'; // Import your API functions

const Chat = ({ userId, chatUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [chatUserId]);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(userId, chatUserId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await sendMessage(userId, chatUserId, newMessage);
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat with User</h2>
      <div style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <div key={message._id}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="3"
          style={{ width: '100%', marginTop: '10px' }}
        />
        <button onClick={handleSendMessage} style={{ marginTop: '10px' }}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Chat;
