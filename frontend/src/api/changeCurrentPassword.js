import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import toast from "react-hot-toast";

export const ChangecurrentPassword = async(formData, userId) => {
    
    try {
        const response = await axios.post(`${url}users/change-Current-Password/${userId}`, {
            ...formData
        })
        toast.success('Password Changed Successfully')
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }   
}