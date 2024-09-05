import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const editUserDetails = async(userId, formData) => {
    
    try {
        const response = await axios.post(`${url}users/edit-avatar/${userId}`,formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },  
        })
        

    } catch (error) {
     console.error('there seems to be an error while changing avatar', error);

    }
};
