import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket} from '../../utils/socketslice.jsx';
import UserCard from '../homepage/userCard/userCard.jsx';
import { FaRegPaperPlane } from "react-icons/fa";
import { useSocket } from '../context/SocketContext.jsx';
import { IoSend } from "react-icons/io5";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const ChatComponent = ({ conversationId, userId, receiver }) => {
    
    const dispatch = useDispatch();
    const socket = useSocket();
    const isConnected = useSelector((state) => state.socket.isConnected);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (!isConnected) {
            if(socket){
                socket.connect();
            }
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
                <div className={`max-w-[70%] p-3 rounded-lg ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} shadow-lg mb-2 overflow-x-clip`}>
                    <p className="text-sm">{content}</p>
                </div>
            </div>
        );
    };

    return (
        <div className='max-h-[85vh] w-full flex flex-col px-1'>
            <div className='top-0 sticky z-10 bg-[#0d1114]'>
                {receiver && receiver[0] ? (
                    <UserCard {...receiver[0]} inChat={true} />
                ) : (
                    <p>No receiver data available</p>
                )}
            </div>
            <div className='flex-1 overflow-y-scroll no-scrollbar px-4 mb-12 '>
                {messages.map((msg, index) => (
                    <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
                        <CustomMessage
                            content={msg.content}
                            isSent={msg.sender && msg.sender._id === userId}
                        />
                    </div>
                ))}
            </div>
            <div className='w-full py-4 text-md bg-slate-600 lg:max-w-[300px] rounded-2xl flex justify-between px-2 mx-1 fixed bottom-0'>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='Send Message'
                    className='bg-transparent focus:outline-none flex-1   no-scrollbar resize-none'
                    rows={1}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                />
                <button onClick={sendMessage} className='px-2 text-blue-500'><IoSend size={25}/></button>
            </div>
        </div>
    );
};

export default ChatComponent;