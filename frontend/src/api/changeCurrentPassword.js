import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const ChangecurrentPassword = async(formData, userId) => {
    console.log(formData);
    
    try {
        const response = await axios.post(`${url}users/change-Current-Password/${userId}`, {
            ...formData
        })
        console.log(response);
        
    } catch (error) {
        console.log('there seems to be an error while changing password', error);
        
    }   
}