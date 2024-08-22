import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, disconnectSocket } from '../../utils/socketslice.jsx';
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import UserCard from '../homepage/userCard/userCard.jsx';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const ChatComponent = ({ conversationId, userId, receiver }) => {
    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socket?.socket); 
    console.log(socket)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (!socket) {
            dispatch(connectSocket());
        }
    }, [socket]);
    
    useEffect(() => {
        if (socket) {
            console.log("Joining conversation with ID:", conversationId);
            socket.emit('joinConversation', conversationId);
    
            const handleReceiveMessage = (message) => {
                console.log("Received message:", message);
                setMessages((prevMessages) => [...prevMessages, message]);
            };
    
            socket.on('receiveMessage', handleReceiveMessage);
    
            return () => {
                socket.off('receiveMessage', handleReceiveMessage);
                dispatch(disconnectSocket());  // Properly disconnect socket
            };
        }
    }, [socket, conversationId]);
    
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${url}messages/${conversationId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setMessages(response.data.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [conversationId]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return; // Prevent sending empty messages
        const messageData = {
            conversationId,
            sender: userId,
            content: newMessage,
        };
        try {
            console.log("Sending message:", messageData);
            await axios.post(`${url}messages`, messageData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (socket) {
                socket.emit('sendMessage', {
                    ...messageData,
                    sender: { _id: userId },
                });
            }

            setNewMessage("");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className='max-h-[85vh] overflow-y-scroll no-scrollbar'>
            <div className='top-0 sticky z-10 bg-[#0d1114]'>
                {receiver && receiver[0] ? (
                    <UserCard {...receiver[0]} />
                ) : (
                    <p>No receiver data available</p>
                )}
            </div>
            <div className='px-4 pb-20'>
                {messages.map((msg, index) => (
                    <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
                        {msg.sender && msg.sender._id === userId ? (
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
