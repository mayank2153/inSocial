import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEdit } from "react-icons/fa";
// import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdExitToApp } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/authslice";
import { UserLogout } from "../../api/userLogout";
import toast from "react-hot-toast";
import logOut_gif from "../../assets/gifs/loggingout.gif"

const ProfilePage = ({ isProfileOpen, setIsProfileOpen }) => {
  const dispatch=useDispatch();
  const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  const [isChecked, setIsChecked]= useState(false);
  
  
  
  const userId = userData?.data.user?userData?.data?.user?._id:userData?.data?._id;
  const userProfileImage = userData?.data.user?userData?.data?.user?.avatar:userData?.data?.avatar;
  const userName = userData?.data?.user?userData?.data?.user?.userName:userData?.data?.userName;
    
  const userLogOut = async() => {
    console.log('hi');
    
    setIsChecked(true);
    await UserLogout(userData, dispatch);
    setIsChecked(false)
    toast.success('User successfully logged out')
  } 

  if(isChecked){
    return (
      <div className="bg-black h-[100vh] flex items-center justify-center">
        <img src={logOut_gif} alt="loggingout"/>
      </div>
    )
  }

  return  (
    <div className="fixed top-20 right-1  bg-[#0d1114]  rounded shadow-md w-[280px] ">
      <div className="flex items-center mb-2 mt-6 ml-6">
        <img src={userProfileImage} alt="User Profile" className="w-12 h-12 rounded-full mr-1"/>
        <div>
        <Link to={`/UserProfile/${userId}`}>
          <span 
          onClick={() => {setIsProfileOpen(false)}}
          className="flex cursor-pointer items-center text-slate-300 font-mono text-xl transition-all duration-300 hover:underline pl-2"> View Profile</span>
        </Link>
        <span className="text-sm text-slate-400 mt-0 hover:text-slate-200 transition-all duration-300 hover:underline">{userName}</span>
        </div>
        
      </div>
      <div className="mb-2 ml-9 mt-6">
        <span 
        onClick={() => {setIsProfileOpen(false)}}
        className="flex  text-slate-300 cursor-pointer items-center font-mono text-xl transition-all duration-300 hover:underline"><FaEdit className="mr-6 text-white "size={20} /> Edit Profile</span>
      </div>
      <div className="ml-8 my-6">
        <button 
          onClick={userLogOut}
        >
        <span 
        onClick={() => {setIsProfileOpen(false)}}
        className="flex text-slate-300  cursor-pointer items-center font-mono text-xl transition-all duration-300 hover:underline"><MdExitToApp className="mr-6 text-white" size={23} /> Logout</span>
        </button>
        
      </div>
    </div>
  ) 
}

export default ProfilePage;
