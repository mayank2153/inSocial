import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket } from '../../utils/socketslice.jsx';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { CountUnreadNotification } from "../../api/unreadNotificationCount.js";
import { incrementUnreadCount } from "../../utils/notificationSlice.jsx";
import { useSocket } from "../context/SocketContext.jsx";
// import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
    const userData = useSelector((state) => state.auth.user);
    const userId = userData?.data?.user?._id;
    const isConnected = useSelector((state) => state.socket.isConnected)
    // Function to fetch previous notifications from the backend
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${url}notification/notifications/${userId}`);
            
            setNotifications(response?.data?.data || []); // Handle empty response
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    // console.log("Joining socket with ID - 2",socket);


    useEffect(() => {

        if(!isConnected){
            if(socket){
                socket.connect();
            }
        }
        // Fetch previous notifications on component mount
        fetchNotifications();
        // fetch count of unread notification
        // CountUnreadNotification(userId);
        // Listen for new notifications
        if (socket) {
            socket.on('notification', (notificationData) => {
                
                setNotifications((prevNotifications) => [notificationData, ...prevNotifications]);
                if(notificationData.userId === userId){
                    dispatch(incrementUnreadCount())
                }
                
            });
        }

        // Clean up the socket event listener when the component unmounts
        return () => {
            if (socket) {
                socket.off('notification');
            }
        };
    }, [socket, dispatch, userId]);
    const handleNotificationClick = (postId) => {
        if (postId) {
            navigate(`/post/${postId}`); // Navigate to the post page using postId
        }
    };


    return (
        <div className="w-full bg-[#0d1114] h-[100vh] overflow-y-scroll no-scrollbar ">
            <div className="mt-4 flex text-center">
                <Link to="/">
                    <h3 className="text-white pt-1 pl-6 lg:ml-10"><IoArrowBackOutline  size={25}/></h3>
                </Link>
                
                <div className="flex justify-center w-full">
                    <h3 className="text-2xl font-mono text-slate-200">Notifications</h3>
                </div>

            </div>
            <div className="mt-10"> 
    <ul>
        {notifications.map((notification, index) => (
            <div 
            className="text-slate-300 mx-6 rounded-lg bg-[#13181d] shadow-xl h-[50px] cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            key={index}
            onClick={() => handleNotificationClick(notification.postId)}
          >
            <li className="my-2">
              <div className="text-center font-sans pt-1">
                <span>{notification.message}</span>
              </div>
              <div className="flex justify-end mr-4">
                <span className="text-slate-400 text-sm">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          </div>
          
        ))}
    </ul>
</div>


        </div>
    );
};

export default Notifications;
