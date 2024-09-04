import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';


export const ChangeCurrentEmail = async(formData, otp ,userId) => {
    
try {
        const response = await axios.post(`${url}users/change-current-Email/${userId}`,{
            ...formData,
            otp
        })
                

} catch (error) {
 console.error('there seems to be an error while changing email', error);

}
};