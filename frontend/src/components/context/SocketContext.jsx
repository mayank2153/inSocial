// src/contexts/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connectSocket } from "../../utils/socketslice.jsx";  // Make sure this is the correct action
import { initializeSocket, disconnectSocket, getSocket } from "../../utils/socketManager.jsx";

const SocketContext = createContext();

export const SocketProvider = ({ children, url, options }) => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);  // Manage socket instance in state

    useEffect(() => {
        const socketInstance = initializeSocket(url, options);  // Initialize socket
        setSocket(socketInstance);  // Set socket in state

        socketInstance.on("connect", () => {
            dispatch(connectSocket(true));  // Dispatch action to update Redux state
        });

        socketInstance.on("disconnect", () => {
            dispatch(connectSocket(false));  // Dispatch action to update Redux state
        });

        return () => {
            disconnectSocket();  // Disconnect socket on cleanup
        };
    }, [dispatch, url, options]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
