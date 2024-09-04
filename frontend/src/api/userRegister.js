import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import toast from "react-hot-toast";

export const UserRegister = async(formData) => {
    
    try {
        const response  = await axios.post(`${url}users/register`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        );
        
        if(response.status === 200){
            toast.success('Registered Successfully');
        }
        

    } catch (error) {
        console.error('error in user register', error);
        toast.error('error?.response?.data?.message')
    }
};