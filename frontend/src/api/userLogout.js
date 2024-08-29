import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import toast from "react-hot-toast";
import { logout } from "../utils/authslice.jsx";

export const UserLogout = async(userData, dispatch) => {
    try {
        console.log("in logout")
        await axios.post(`${url}users/logout`,userData,{
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true});
        console.log('user successfully loggedOut');
        dispatch(logout())
        toast.success('User successfully logged out')
  
  
      } catch (error) {
        console.log('error while logging out', error);
      }
}