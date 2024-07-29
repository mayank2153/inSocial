import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
 export const getPostById=async(postId)=>{
    try {
        const response = await axios.get(`${url}posts/getPost/${postId}`,{
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.error('Error fetching post details:', error);
    throw new Error('Error fetching post details');
    }
 }