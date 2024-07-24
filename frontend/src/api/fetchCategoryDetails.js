import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const fetchCategoryDetails = async (categoryId) => {
  try {
    const response = await axios.get(`${url}category/category/${categoryId}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching category details:', error);
    throw new Error('Error fetching category details');
  }
};
