import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import { useDispatch } from "react-redux";
import { resetUnreadCount } from "../utils/notificationSlice";

export const UpdateCount = async(userId, dispatch) => {
    
    
    try {
        const response = await axios.post(`${url}notification/update-notification-count/${userId}`);
        dispatch(resetUnreadCount());
    } catch (error) {
        console.error('error', error);
    }
};