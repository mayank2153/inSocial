import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../utils/authslice.jsx";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}users/login`, user, { withCredentials: true });
            dispatch(loginSuccess(response.data));
            console.log(response.data)
            navigate('/'); // Redirect to the homepage after successful login
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
            alert(error.response.data.message || "Login failed");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <div className="bg-[#0f031c] shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl  text-center text-white mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white pl-4 pb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white pl-4 pb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleInput}
                                className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22}/>}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-white text-[#0f031c] py-2 rounded-full hover:bg-[#101C03] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center flex gap-2 justify-center">
                    <p className="text-slate-300">Don't have an account? </p>
                    <Link to="/register" className="text-blue-500 hover:underline">
                         Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
