import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';


export const fetchPostsByCategory=async({categoryId})=>{
    try {
        const response = await axios.get(`${url}posts/getPostsByCategory/${categoryId}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
        return response.data.data;

    } catch (error) {
        console.error("error fetching posts by category",error)
    }
}