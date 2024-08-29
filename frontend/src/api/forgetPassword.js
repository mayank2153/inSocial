import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const forgetPassword = async(email) => {
    try {
        const response = await axios.post( `${url}users/forgetPassword`, {
            email        
        });
        console.log('request for changing email sent', response);
        
    } catch (error) {
        console.log('there seems to be a problem in fetching email', error);
        
    }
};