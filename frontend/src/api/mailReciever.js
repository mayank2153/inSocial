import axios from 'axios';
import toast from 'react-hot-toast';
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const mailReciever = async(formData) => {
    try {
        const response = await axios.post(`${url}api/contact/contactus`, {
            ...formData
        })
        if(!response){
            toast.error('Unexpected Error')
        }
        // console.log(response);
        
    } catch (error) {
        console.error(error)
        toast.error('Server Error')
    }
}