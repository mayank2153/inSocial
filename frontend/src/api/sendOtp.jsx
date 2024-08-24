import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const sendOtp = async(email) => {
       try {
            const response = await axios.post(` ${url}users/otp-request`, {
                email,
            })
            console.log('otp api response', response.data);
            if(!response){
                console.log('error seems to be generating otp');
            }
        } catch (error) {
        console.log('error in generating otp', error);
        }
};