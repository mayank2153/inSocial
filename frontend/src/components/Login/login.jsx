import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../utils/authslice.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { notifyError } from "../../utils/notifications.jsx";
import logo from "../../assets/images/logo.jpg"
import logo_img_black from "../../assets/images/logo_img_black.png"
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from 'react-icons/ai'; 

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [ forgetPassword, setForgetPassword ] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("1")
            const response = await axios.post(`${url}users/login`, user, { withCredentials: true });
            console.log("response:",response.data)
            dispatch(loginSuccess(response.data));

            navigate('/');
            toast.success(response?.data?.message) // Redirect to the homepage after successful login
        } catch (error) {
            console.log(error?.response?.data);
            // Display notification with error message
            // notifyError(error?.response?.data?.message || "Login failed");
            toast.error(error?.response?.data?.message || "Login failed", {
                duration:4000,
                
                icon: <AiOutlineCloseCircle />,
            })

            dispatch(loginFailure(error?.response?.data?.message));
            // alert(error.response.data.message || "Login failed");
            setForgetPassword(true);

        }
    };
    const handleGoogleLogin = () => {
        window.location.href = `${url}users/auth/google`;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center  flex-col lg:flex-row lg:justify-evenly min-h-screen bg-black w-full max-w-screen-2xl px-10">
            <div className="mt-14 hidden lg:block">
                <img src={logo} alt="logo.png"/>
            </div>
            <div className="mt-10 block lg:hidden w-20 mb-20">
                <img src={logo_img_black} alt="logo.png"/>
            </div>
            <div className="bg-black  mr-0 w-full max-w-md">
                <h2 className="text-5xl text-center text-white mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-xl text-white pl-4 pb-1">Email</label>
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
                        <label className="block text-white  text-xl pl-4 pb-1">Password</label>
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
                        { forgetPassword && 
                            <div>
                            <Link to="/Forget-Password">
                            <span className=" pl-4 text-sm font-sans pt-1 hover:cursor-pointer text-red-400 hover:text-red-600 transition-all duration-300">
                                forget Password?
                            </span>
                            </Link>
                            
                        </div>
                            
                        }
                        
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-white text-[#0f031c] py-2 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100"
                        >
                            Login
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-black py-2 rounded-full flex justify-center gap-4 font-bold hover:bg-gray-200"
                        >
                            <FaGoogle className="text-blue-600 mt-1" />
                            Sign In With 
                            <span className="text-blue-600"> Google</span>
                        </button>
                    </div>
                </form>
                <div className="text-center flex gap-2 justify-center">
                    <p className="text-slate-300">Don't have an account?</p>
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
