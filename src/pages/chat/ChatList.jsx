import React from "react";

const ChatList = ({ chats = [], onSelectChat, onCreateGroup }) => {
  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>My Chats</h2>
        <button className="new-group-btn" onClick={onCreateGroup}>
          New Group Chat +
        </button>
      </div>
      <div className="chat-items">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="chat-item"
            onClick={() => onSelectChat(chat)}
          >
            <h3>
              {chat.isGroupChat
                ? chat.chatName
                : chat.users[1]?.firstName ?? "first"}
            </h3>
            <p>
              {chat.latestMessage
                ? `${chat.latestMessage.sender?.firstName || "Unknown"}: ${chat.latestMessage.content}`
                : "No messages yet"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
