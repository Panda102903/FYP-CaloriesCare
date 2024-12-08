import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Socket.io server
    const socketConnection = io('http://localhost:4000');
    setSocket(socketConnection);

    // Listen for messages from admin
    socketConnection.on('newMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'admin', text: msg }]);
    });

    // Send the chat message to the server
    socketConnection.emit('chatMessage', message);

    return () => {
      socketConnection.disconnect();
    };
  }, [message]);

  const handleMessageSend = () => {
    // Add the message to chat
    setMessages((prevMessages) => [...prevMessages, { sender: 'customer', text: message }]);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <h3>Chat with Admin</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender === 'admin' ? 'Admin' : 'You'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatBox;
