import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEdit } from "react-icons/fa";
// import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdExitToApp } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/authslice";

const ProfilePage = () => {
  const dispatch=useDispatch();
  const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  console.log(userData);
  const userId = userData?.data?.user?._id;
  const userProfileImage = userData?.data?.user?.avatar;
  const userName = userData?.data?.user?.userName;
  console.log('control reaching here');
  const userLogOut = async() => {
    try {
      await axios.post(`${url}users/logout`,userData,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true});
      console.log('user successfully loggedOut');
      dispatch(logout())


    } catch (error) {
      console.log('error while logging out', error);
    }
  } 

  return  (
    <div className="absolute -right-20 top-16  bg-[#13181d]  rounded shadow-md w-80 mr-10 ">
      <div className="flex items-center mb-2 mt-6 ml-6">
        <img src={userProfileImage} alt="User Profile" className="w-12 h-12 rounded-full mr-1"/>
        <div>
        <Link to={`/UserProfile/${userId}`}>
          <span className="flex cursor-pointer items-center text-slate-300 hover:text-slate-100 transition-all duration-300 hover:underline"> View Profile</span>
        </Link>
        <span className="text-sm text-slate-400 mt-0 hover:text-slate-200 transition-all duration-300 hover:underline">{userName}</span>
        </div>
        
      </div>
      <div className="mb-2 ml-9 mt-6">
        <span className="flex  text-slate-300 cursor-pointer items-center hover:text-slate-100 transition-all duration-300 hover:underline"><FaEdit className="mr-6 text-white "size={20} /> Edit Profile</span>
      </div>
      <div className="ml-8 my-6">
        <button 
          onClick={userLogOut}
        >
        <span className="flex text-slate-300  cursor-pointer items-center hover:text-slate-100 transition-all duration-300 hover:underline"><MdExitToApp className="mr-6 text-white" size={23} /> Logout</span>
        </button>
        
      </div>
    </div>
  ) 
}

export default ProfilePage;
