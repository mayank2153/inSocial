import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const UserRegister = async(formData) => {
    
    try {
        const response  = await axios.post(`${url}users/register`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        );
        

    } catch (error) {
        console.error('error in user register', error);
        
    }
};