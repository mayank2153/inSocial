import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import PostCard from "../postCard.jsx";
// import { IoArrowBackOutline } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import CommentInput from "../comments/commentInput.jsx";
import ShowComments from "../comments/showComments.jsx";
import { Link } from "react-router-dom"
import ShimmerPost from "../../shimmer/shimmerPose.jsx";
const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const PostPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bgColor = '#0d1114'
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`${url}posts/getPost/${postId}`, {
          
          withCredentials: true,
        });
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
    return <div className="bg-[#0d1114] flex items-center justify-center h-[100vh]">
      <ShimmerPost />
    </div>;
  }

  if (error) {
    return <div className="bg-black text-white font-mono text-center text-2xl h-[100vh]">Error fetching post: {error}</div>;
  }

  if (!data) {
    return <div className="bg-black text-white font-mono text-center text-2xl h-[100vh]">No post data</div>;
  }

  return (
    <div className="flex flex-col items-center bg-[#0d1114] h-screen max-h-[100vh] overflow-y-scroll no-scrollbar py-10  w-full   min-w-[200px] break-words max-w-[880px]">
      <div className="bg-[#0d1114] lg:px-4 px-2 py-2 rounded-2xl w-full flex flex-col items-center">
        <div className="flex bg-[#0d1114]">
          <Link to='/'>
            <TiArrowBack className="ml-1 text-slate-300 mt-8 " size={30} />
          </Link>
          <PostCard {...data} bgColor={bgColor} />
        </div>
        <CommentInput postId={postId} />
        <ShowComments />
      </div>
    </div>

  );
};

export default PostPage;
