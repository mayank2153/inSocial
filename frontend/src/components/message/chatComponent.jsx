import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, disconnectSocket } from '../../utils/socketslice.jsx';
import UserCard from '../homepage/userCard/userCard.jsx';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const ChatComponent = ({ conversationId, userId, receiver }) => {
    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socket?.socket); 
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
            socket.emit('joinConversation', conversationId);
    
            const handleReceiveMessage = (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            };
    
            socket.on('receiveMessage', handleReceiveMessage);
    
            return () => {
                socket.off('receiveMessage', handleReceiveMessage);
                dispatch(disconnectSocket());
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
        if (!newMessage.trim()) return;
        const messageData = {
            conversationId,
            sender: userId,
            content: newMessage,
        };
        try {
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

    const CustomMessage = ({ content, date, isSent }) => {
        return (
            <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} shadow-lg mb-2`}>
                    <p className="text-sm">{content}</p>
                    {/* <span className="text-xs text-gray-400 mt-1 block">
                        {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span> */}
                </div>
            </div>
        );
    };

    return (
        <div className='max-h-[85vh] max-w-[400px] overflow-y-scroll no-scrollbar'>
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
                        <CustomMessage
                            content={msg.content}
                            
                            isSent={msg.sender && msg.sender._id === userId}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
                <div className='fixed bottom-0 w-full max-w-[400px]  py-4  text-lg bg-slate-600 rounded-2xl flex justify-between '>
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
