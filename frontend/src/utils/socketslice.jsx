import { createSlice } from "@reduxjs/toolkit";
// import { disconnect } from "mongoose";

const initialState = {
    isConnected : false,
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket: (state, action) => {
            state.isConnected = action.payload;
        },
    },
});

export const { connectSocket, } = socketSlice.actions;
export default socketSlice.reducer;