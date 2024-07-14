import axios from 'axios';
import { setPosts, setLoading, setError } from '../utils/postsSlice.jsx';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const fetchPosts = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const response = await axios.get(`${url}posts/AllPosts`);
    dispatch(setPosts(response.data)); 
  } catch (error) {
    dispatch(setError(error.message));
  }
};
