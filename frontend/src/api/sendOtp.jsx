import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
import toast from "react-hot-toast";

export const sendOtp = async(email,scenario) => {
    
    
       try {
            const response = await axios.post(` ${url}users/otp-request`, {
                email,
                scenario
            })
            
            toast.success(response?.data?.message)
            if(!response){
                toast.error('Facing issues generating OTP')
            }
        } catch (error) {
            
        toast.error(error?.response?.data?.message || 'Facing issues Sending OTP')

        }
};