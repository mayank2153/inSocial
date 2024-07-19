import axios from "axios";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${url}category/category`);
        if (response.data.success) {
            console.log(response.data)
            return response.data.categories;
        }
    } catch (error) {
        throw new error('There seems to be an error in fetching Categories :', error);
    }
};