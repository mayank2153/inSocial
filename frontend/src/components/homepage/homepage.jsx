import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../api/postsApi.js";
import PostCard from "./postCard.jsx";
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
  console.log(items);
  return (
    <div className="flex flex-col items-center bg-black ">
      {
        items && items.data && items.data.length > 0 ? (
          items.data.map((item) => (
            <PostCard key={item._id} {...item} />
          ))
        ) : (
          <div>No posts available</div>
        )
      }
    </div>
  );
};

export default HomePage;
