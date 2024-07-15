import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const PostCard = ({ title, description, owner, votes, updatedAt, media, comments, category }) => {
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [ownerResponse, categoryResponse] = await Promise.all([
          axios.get(`${url}users/get-user/${owner}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }),
          axios.get(`${url}category/category/${category}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          })
        ]);
        setOwnerDetails(ownerResponse.data.data);
        setCategoryDetails(categoryResponse.data.data.name);
      } catch (error) {
        setError('Error fetching details');
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [owner, category]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="post-card bg-white border py-4 px-8 shadow-md w-[500px] max-h-[500px]">
      <div className='flex gap-10'>
        {ownerDetails && (
          <div className="owner-info flex items-center mb-4 gap-4">
            <img
              src={ownerDetails.avatar}
              alt={`Avatar of ${ownerDetails.userName}`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <span className="font-bold">{ownerDetails.userName}</span>
              <p className='text-sm'> {new Date(updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        <p className='text-sm'>{categoryDetails}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        {media && (
          <div className="media mt-4">
            <img src={media} alt="Media content" className="max-w-full h-auto rounded-md" />
          </div>
        )}
        <div className="text-sm text-gray-500 flex gap-10 mt-2">
          <div className='flex gap-2'>
            <div className='flex'>
              <AiOutlineLike size={20} />
              <AiOutlineDislike size={20} />
            </div>
            <p>{votes.length}</p>
          </div>
          <div className='flex gap-2'>
            <FaRegComment size={20} />
            <p>{comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
