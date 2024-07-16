import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import PostCard from "../postCard.jsx";

const url = import.meta.env.VITE_BASE_URL;

const PostPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("entered")
        const response = await axios.get(`${url}posts/getPost/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        console.log(response.data)
        setData(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching post: {error}</div>;
  }

  if (!data) {
    return <div>No post data</div>;
  }

  return (
    <div className="flex justify-center">
      <PostCard {...data} />
    </div >
  );
};

export default PostPage;
