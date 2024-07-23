import React from 'react';

const ChatHistory = ({ onCreateGroup, onSelectChat }) => {
  // Dummy data for chat history
  const chats = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Group Chat 1' },
    // Add more chat entries as needed
  ];

  return (
    <div className="chat-history">
      <button onClick={onCreateGroup} className="create-group-btn">Create Group</button>
      <div className="chat-list">
        {chats.map(chat => (
          <div key={chat.id} className="chat-item" onClick={() => onSelectChat(chat)}>
            {chat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;