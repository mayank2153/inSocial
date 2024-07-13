import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../utils/authSlice";

const url = process.env.BASE_URL || 'http:localhost:8000/api/';

const Login = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({ ...user, [name]: value});
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        
        try {
            const response  = await axios.post(`${url}users/login`, user, { withCredentials: true});
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
            SpeechSynthesisErrorEvent(error.response.data.message || "Login failed")
        }


    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
        <div className="container"></div>
        </>
    )
}

export default Login;