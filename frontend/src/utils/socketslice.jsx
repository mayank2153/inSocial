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
            if(!state.socket){
                state.socket = io('http://localhost:8000/');
            }
        },
        disconnectSocket: (state) => {
            if(state.socket){
                state.socket.disconnect();
                state.socket = null;
            }
        },
    },
});

export const { connectSocket, disconnectSocket} = socketSlice.actions;
export default socketSlice.reducer;