import React, { useState,useRef,useEffect } from 'react';

const ChatArea = ({ selectedChat, messages = [], onSendMessage, onShowUserDetails }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-area">
      {selectedChat && (
        <>
          <div className="chat-area-header">
            <h2>{selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1]?.firstName}</h2>
            <div className="chat-actions">
              <button className="view-info-btn" onClick={onShowUserDetails}>👁️</button>
            </div>
          </div>
          <div className="messages">
            {messages.map(message => (
              <div key={message._id} className={`message ${message.sender._id === selectedChat.users[0]._id ? 'sent' : 'received'}`}>
                {message.sender._id === selectedChat.users[0]._id && (
                  <span className="receiver-name">{selectedChat.users[1]?.firstName}</span>
                )}
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;