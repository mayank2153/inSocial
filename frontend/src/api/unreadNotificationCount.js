import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import { useDispatch, useSelector } from "react-redux";
import { setUnreadCount } from "../utils/notificationSlice";

export const CountUnreadNotification = async(userId, dispatch) => {
    

    try {
        const response = await axios.get(`${url}notification/unread-count/${userId}`);
        dispatch(setUnreadCount(response?.data?.data));    
    } catch (error) {
        console.log('seems to be an error while getting user notification count',error);
    }
};