// import axios from 'axios';
// const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

// export const UserData = async(userId) => {
//     // console.log(userId);
//     const id = userId.userId;
// // console.log('id',id);

//     // const {id} = userId;
//     try {
//         const response  = await axios.post(`${url}users/get-user/${id}`, {id});
//         console.log('user-data', response?.data);
        
//     } catch (error) {
//         console.log('there seems to be an error while fetching data', error.message);
        
//     }
// };