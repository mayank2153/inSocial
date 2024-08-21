import { createSlice } from "@reduxjs/toolkit";
// import { disconnect } from "mongoose";
import { io } from "socket.io-client";

const initialState = {
    socket : null,
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket: (state) => {
            console.log("het")
            if(!state.socket){
                state.socket = io(import.meta.env.VITE_BASE_URL || 'http://localhost:8000/', { withCredentials: true });

                state.socket.on('connect', () => {
                    console.log('Connected to socket server:', state.socket.id);
                });

                state.socket.on('connect_error', (error) => {
                    console.error('Connection error:', error);
                });
            }
        },
        disconnectSocket: (state) => {
            if(state.socket){
                state.socket.disconnect();
                console.log('Socket disconnected');
                state.socket = null;
            }
        },
    },
});

export const { connectSocket, disconnectSocket} = socketSlice.actions;
export default socketSlice.reducer;