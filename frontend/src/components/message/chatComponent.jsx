import React, { useEffect, useState } from 'react';
import socket from '../../utils/socket.js';

const ChatComponent = ({ conversationId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        socket.connect();

        // Join the conversation room
        socket.emit('joinConversation', conversationId);

        // Listen for incoming messages
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [conversationId]);

    const sendMessage = () => {
        const messageData = {
            conversationId,
            sender: userId,
            text: newMessage,
        };
        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
