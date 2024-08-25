import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import PostCard from "../postCard.jsx";
// import { IoArrowBackOutline } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import CommentInput from "../comments/commentInput.jsx";
import ShowComments from "../comments/showComments.jsx";
import { Link } from "react-router-dom"
const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const PostPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bg_color = '#0d1114'
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(postId);
        const response = await axios.get(`${url}posts/getPost/${postId}`, {
          
          withCredentials: true,
        });
        console.log("check")
        console.log(response);
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
    <div className="flex flex-col items-center w-full bg-[#0d1114] h-screen  max-h-[100vh] overflow-y-scroll no-scrollbar py-10">

      <div className="bg-[#0d1114] w-[800px] px-4 py-2 rounded-2xl">
      <div className="flex bg-[#0d1114]">
        <Link to='/'>
        <TiArrowBack  className="ml-1 text-slate-300 mt-8 " size={30}/>
        </Link>
        
        
        <PostCard {...data} bg_color={bg_color}  />
      </div>
        
        <CommentInput postId={postId} />
        <ShowComments />
      </div>
    </div>
  );
};

export default PostPage;
