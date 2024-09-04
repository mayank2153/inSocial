import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const UserData = async(userId) => {
    const id = userId;
    try {
        const response  = await axios.get(`${url}users/get-user/${id}`,{},
            { withCredentials: true }
        );
        return response?.data;
        
    } catch (error) {
        console.error('there seems to be an error while fetching data', error.message);
        
    }
};