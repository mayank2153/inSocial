import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import toast from 'react-hot-toast';

export const forgetPassword = async(email) => {
    try {
        
        const response = await axios.post( `${url}users/forgetPassword`, {
            email        
        });
        toast.success(response?.data?.message)    

        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
};