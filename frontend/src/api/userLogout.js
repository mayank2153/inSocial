import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import toast from "react-hot-toast";
import { logout } from "../utils/authslice.jsx";
// import toast from "react-hot-toast";.

export const UserLogout = async(userData, dispatch) => {
    try {
        
        await axios.post(`${url}users/logout`,userData,{
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true});
          toast.success('LogOut Successfull')
        dispatch(logout())
        
        
  
  
      } catch (error) {
        console.error('error while logging out', error);
        toast.error('Server Error')
      }
}