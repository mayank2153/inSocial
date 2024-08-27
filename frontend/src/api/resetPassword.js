import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const resetPassword = async(resetData) => {
    try {
        const response =  await axios.post(`${url}users/reset-password`, resetData);
        console.log('on successful reset', response);
        
    } catch (error) {
        console.log('there seems to be a problem in resetting password ', error);
        
    }
};