import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AdminChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Socket.io server
    const socketConnection = io('http://localhost:4000');

    // Notify server that the admin is connected
    socketConnection.emit('adminConnect');

    // Listen for messages from customers
    socketConnection.on('newMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'customer', text: msg }]);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const handleReplySend = () => {
    if (socket) {
      socket.emit('adminReply', reply);
      setMessages((prevMessages) => [...prevMessages, { sender: 'admin', text: reply }]);
      setReply('');
    }
  };

  return (
    <div className="chat-box">
      <h3>Chat with Customer</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender === 'admin' ? 'Admin' : 'Customer'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Reply to the customer"
      />
      <button onClick={handleReplySend}>Send Reply</button>
    </div>
  );
};

export default AdminChatBox;
