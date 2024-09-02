import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "./authslice.jsx";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const checkTokenValidity = async () => {
    console.log("in checktokenvalidity")
    try {
        const response = await axios.get(`${url}api/auth/verify-token`, {
            withCredentials: true,  
        });
        console.log("response of token validity:",response);
        
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.log('Error:', error);
        
        return false;
    }
};