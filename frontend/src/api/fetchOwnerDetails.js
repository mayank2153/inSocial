import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const fetchOwnerDetails = async (ownerId) => {
  try {
    const response = await axios.get(`${url}users/get-user/${ownerId}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching owner details:', error);
    throw new Error('Error fetching owner details');
  }
};
