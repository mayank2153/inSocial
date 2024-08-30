import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const resetPassword = async(resetData) => {
    try {
        const response =  await axios.post(`${url}users/reset-password`, resetData);
        
        
    } catch (error) {
        console.error('there seems to be a problem in resetting password ', error);
        
    }
};