import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../utils/authslice.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/images/logo.jpg';
import logo_img_black from '../../assets/images/logo_img_black.png';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ClipLoader from 'react-spinners/ClipLoader.js';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}users/login`, user, {
        withCredentials: true,
      });
      dispatch(loginSuccess(response.data));
      setLoading(false);

      navigate('/');
      toast.success(response?.data?.message); // Redirect to the homepage after successful login
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || 'Login failed', {
        duration: 4000,

        icon: <AiOutlineCloseCircle />,
      });
      setLoading(false);

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
    <div className="flex items-center  flex-col lg:flex-row lg:justify-evenly min-h-screen  w-full ">
      <div className="bg-[#1e1e1e] h-screen  mr-0 max-w-full w-[70%] flex flex-col justify-center">
        {/* <div>
                <img src={logo_img_black}></img>
            </div> */}
        <div className="w-[500px] ml-40">
          <h2 className="text-3xl text-left text-white mb-6">Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-md text-[#EDEDED]  pb-1">
                Enter your username or email address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                className="w-full px-3 py-2 text-[#BDBDBD]  rounded-md bg-[#1e1e1e]  focus:outline-none border border-[#BDBDBD]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#EDEDED]  text-md pb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  className="w-full px-3 py-2 text-[#BDBDBD]  rounded-md bg-[#1e1e1e]  focus:outline-none border border-[#BDBDBD]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none text-[#BDBDBD]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={22} />
                  ) : (
                    <FaEye size={22} />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                {forgetPassword && (
                  <div>
                    <Link to="/Forget-Password">
                      <span className="   text-right w-full text-sm font-sans pt-1 hover:cursor-pointer text-red-400 hover:text-red-600 transition-all duration-300">
                        forget Password?
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4 mb-4">
              <button
                type="submit"
                className="w-full bg-[#7F3FBF] text-slate-200 py-2 rounded-md hover:bg-[#6b30a7]  focus:outline-none  font-semibold duration-200"
              >
                {Loading ? (
                  <ClipLoader color="#ffffff" size={20} className="mt-1" />
                ) : (
                  'Sign In'
                )}
              </button>
              <p className="text-[#D9D9D9] text-center w-full">Or</p>
              <button
                type="submit"
                className="w-full  text-slate-200 py-2 rounded-md    font-semibold duration-200 border border-[#BDBDBD]"
              >
                <div className="flex justify-center items-center gap-2 text-[#D9D9D9]">
                  <img
                    src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1740912973/google_1_ws7mje.svg"
                    className="h-6"
                  ></img>
                  <p>Sign In With Google</p>
                </div>
              </button>
            </div>
          </form>
          <div className="text-center flex gap-2 justify-center">
            <p className="text-[#D9D9D9]">Don't have an account yet?</p>
            <Link to="/register" className="text-[#7F3FBF]  font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute w-full my-auto right-72 rounded-lg h-full max-w-[500px] max-h-[600px] bg-[#121212] "></div>
      <div className="w-[30%] h-screen bg-[#7F3FBF]"></div>
    </div>
  );
};

export default Login;
