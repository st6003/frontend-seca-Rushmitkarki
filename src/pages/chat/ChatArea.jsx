import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const ChatArea = ({
  selectedChat,
  messages = [],
  onSendMessage,
  onShowUserDetails,
  currentUser,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const getOtherUser = () => {
    if (!selectedChat || !selectedChat.users) return null;
    return selectedChat.users.find((user) => user.id !== currentUser.id);
  };
  const renderMessage = (message) => {
    console.log(
      "currentUser.id:",
      currentUser.id,
      "message.sender.id:",
      message.sender.id
    );
    const isOwnMessage = message.sender.id === currentUser.id;
    const messageClass = isOwnMessage ? "message sent" : "message received";

    return (
      <div key={message._id} className={messageClass}>
        <span className="sender-name">
          {isOwnMessage ? "You" : message.sender.firstName}
        </span>
        <div className="message-content">{message.content}</div>
        <div className="message-timestamp">
          {moment(message.createdAt).format("HH:mm")}
        </div>
      </div>
    );
  };

  return (
    <div className="chat-area">
      {selectedChat && (
        <>
          <div className="chat-area-header">
            <h2>
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : getOtherUser().firstName}
            </h2>
            <div className="chat-actions">
              <button className="view-info-btn" onClick={onShowUserDetails}>
                👁️
              </button>
            </div>
          </div>
          <div className="messages">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
