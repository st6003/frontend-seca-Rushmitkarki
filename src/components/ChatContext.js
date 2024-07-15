import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); 
    setSocket(newSocket);

    newSocket.on('getMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
