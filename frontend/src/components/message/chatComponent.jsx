import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import socket from '../../utils/socket.js';
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { Input } from 'react-chat-elements'

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const ChatComponent = ({ conversationId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const lastMessageRef = useRef(null); // Reference to the last message

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${url}messages/${conversationId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                console.log(response.data.data)
                setMessages(response.data.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
        
        socket.connect();

        // Join the conversation room
        socket.emit('joinConversation', conversationId);

        // Listen for incoming messages
        
    
        const handleReceiveMessage = (message) => {
            console.log("message receive:",message)
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        socket.on('receiveMessage', handleReceiveMessage);
        socket.on('receiveMessage', console.log("message receive"));
        // Clean up the effect by disconnecting the socket and removing listeners
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.disconnect();
        };
    }, [conversationId]);
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // Scroll to the bottom when messages update

    const sendMessage = async () => {
        const messageData = {
            conversationId,
            sender: userId,
            content: newMessage,
        };
        try {
            console.log("Sending message:", messageData);
            await axios.post(`${url}messages`, messageData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
    
            socket.emit('sendMessage', {
                ...messageData,
                sender: { _id: userId } // Include sender object with _id
            });
    
            setNewMessage("");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
 
    return (
        <div>
            <div className='px-4 pb-20'>
            {messages.map((msg, index) => (
                <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
                    {msg.sender && msg.sender._id == userId ? (
                        <MessageBox
                            position='right'
                            title={msg.content}
                            date={new Date(msg.date)}
                            type='text'
                        />
                    ) : (
                        <MessageBox
                            position='left'
                            title={msg.content}
                            date={new Date(msg.date)}
                            type='text'
                        />
                    )}
                </div>
))}

            </div>
            <div className='flex justify-center'>
                <div className='fixed bottom-0 py-4 px-8 text-lg bg-slate-600 rounded-2xl w-full max-w-[390px] mx-2 flex justify-between'>
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)} 
                        placeholder='Send Message'
                        className='bg-transparent focus:outline-none'
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
