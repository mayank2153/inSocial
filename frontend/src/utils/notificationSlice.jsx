import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    unreadCount: 0,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        incrementUnreadCount: (state) => {
            state.unreadCount += 1;
        },
        resetUnreadCount: (state) => {
            state.unreadCount = 0;
        },
    },
});

export const {setUnreadCount, incrementUnreadCount, resetUnreadCount} = notificationSlice.actions;
export default notificationSlice.reducer;
// export const fetchUnreadNotificationCount = (userId) => async(dispatch) => {
//     try {
//         const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
//         const response = await axios.get(`${url}notification/unread-count/${userId}`);
//     } catch (error) {
        
//     }
// }