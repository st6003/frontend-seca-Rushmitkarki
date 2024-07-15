import React, { useContext, useState } from 'react';
import { ChatContext } from '../../components/ChatContext';
import "./chat.css"


const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="container" style={{ marginleft:"20rem" }}>
      <h1 className="mt-5 text-3xl font-bold mb-6 text-center">Chat Room</h1>

      <div className="chat-container"> 
        <div className="chat-messages border border-gray-300 p-4 h-96 overflow-y-scroll mb-4 bg-gray-50 rounded-lg shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message p-3 mb-3 rounded-lg shadow ${
                index % 2 === 0 ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'
              }`}
            >
              {msg}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="chat-input flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
