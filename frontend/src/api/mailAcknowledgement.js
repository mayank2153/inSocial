import axios from 'axios';
import toast from 'react-hot-toast';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const mailAcknowledgment = async(formData) => {
    try {
        const response = await axios.post(`${url}api/contact/acknowledgement`,{
            ...formData
        })
        
    } catch (error) {
        console.error(error)
    }
};