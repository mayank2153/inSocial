import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const ChangeCurrentEmail = async(formData, otp ,userId) => {
    
try {
        const response = await axios.post(`${url}users/change-current-Email/${userId}`,{
            ...formData,
            otp
        })
        // console.log('response after changing email', response.data);

} catch (error) {
 console.error('there seems to be an error while changing email', error);

}
};