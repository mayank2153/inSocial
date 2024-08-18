import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false, // Only connect when you want to
});

export default socket;
