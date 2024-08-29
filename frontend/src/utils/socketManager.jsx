// src/utils/socketManager.jsx
import { io } from 'socket.io-client';

let socket;

export const initializeSocket = (url, options) => {
    if (!socket) {
        socket = io(url, options);

        socket.on('connect', () => {
            console.log('Connected to socket server:', socket.id);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });
    }
    return socket;  // Return the socket instance
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
        socket = null;
    }
};

export const getSocket = () => socket;
