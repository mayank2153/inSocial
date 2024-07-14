import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchPosts } from "../../api/postsApi.js";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const HomePage = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.posts);
  
    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
    else{
        console.log(items)
    }
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
  };
  
  export default HomePage;