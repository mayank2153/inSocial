import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { fetchOwnerDetails } from '../../api/fetchOwnerDetails.js';
import { fetchCategoryDetails } from '../../api/fetchCategoryDetails.js';
import { MdEdit } from "react-icons/md";
import { connectSocket } from '../../utils/socketslice.jsx';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const PostCard = ({ title, description, owner, votes, updatedAt, media, comments, category, _id,bgColor="#13181d" }) => {
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const voteCount = votes.length;
  const [voteNumber, setVoteNumber] = useState(voteCount);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const currentUser = useSelector((state) => state.auth.user?.data?.user?._id);
  const userName = useSelector((state) => state.auth.user?.data?.user?.userName);

  useEffect(() => {
    if (!socket) {
      dispatch(connectSocket());
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userVote = votes.find(vote => vote.voteOwner === currentUser);
      if (userVote) {
        setUserVote(userVote.voteType);
      }
      console.log("currentUser:", currentUser);
    }
  }, [currentUser, votes]);
  const handleVote = async (voteType) => {
    if (userVote === voteType) {
      // If the user is clicking the same vote type again, remove the vote
      const voteId = votes.find(vote => vote.voteOwner === currentUser)?.voteId;
      console.log("vote is",voteId)
      await removeVote(voteId);
      setUserVote(null);
      setVoteNumber(voteNumber - 1);
    } else {
      // Otherwise, cast the vote
      try {
        const response = await axios.post(`${url}vote/create-vote/${_id}`, { voteType }, {
          withCredentials: true
        });
        console.log('Vote response:', response.data);
        setUserVote(voteType);

        if (socket) {
          const emitData = {
            message: `User ${userName} reacted on your post`,
            postId: _id,
            actor: currentUser,
            receiver: owner,
            type: voteType
          };

          socket.emit('likePost', emitData);
          console.log('vote emitted', emitData);
        }

        if (voteNumber <= voteCount) {
          setVoteNumber(voteNumber + 1);
        }

      } catch (error) {
        console.error('Error casting vote:', error);
        alert(error.response?.data?.message || "Error casting vote");
      }
    }
  };

  const removeVote = async (voteId) => {
    try {
      const deleteVote = await axios.post(`${url}vote/delete-vote/${voteId}`,{},
       { withCredentials: true} 
      
      );
      console.log("deleteVote", deleteVote);
    } catch (error) {
      console.error('Error deleting vote:', error);
      alert(error.response?.data?.message || "Error deleting vote");
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [ownerResponse, categoryResponse] = await Promise.all([
          fetchOwnerDetails(owner),
          fetchCategoryDetails(category)
        ]);
        setOwnerDetails(ownerResponse);
        setCategoryDetails(categoryResponse);
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
    <div className="post-card shadow-md rounded-lg py-1  w-full lg:max-w-[650px] min-w-[350px]" style={
      {backgroundColor: bgColor}
    }>
      <div
        className='p-4'
        onMouseEnter={() => setHoveredPost(true)}
        onMouseLeave={() => setHoveredPost(false)}
      >
        <div className='flex sm:flex-row gap-4 sm:gap-6 justify-between'>
          {ownerDetails && (
            <div className="owner-info flex items-center mb-4 gap-4 text-white">
              <img
                src={ownerDetails.avatar}
                alt={`Avatar of ${ownerDetails.userName}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <Link to={`/UserProfile/${owner}`}>
                  <span className="font-bold">{ownerDetails.userName}</span>
                </Link>
                <p className='text-sm'>{new Date(updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
          <div className='flex-1'>
            <p className='text-sm text-white flex justify-end mr-0 lg:mr-4'>{categoryDetails?.name}</p>
            {hoveredPost === true && currentUser === owner && (
              <Link to={`/post/edit-post/${_id}`}>
                <div className='flex bg-[#13181d] rounded-full gap-1 cursor-pointer pr-1 justify-end transition-all duration-700'>
                  <p className='text-xl text-slate-400'><MdEdit /></p>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div>
          <Link to={`/post/${_id}`}>
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
            <p className="text-[#9bb7b8]">{description}</p>
          </Link>
          {media && (
            <div className="media mt-4 rounded-2xl border border-slate-200 flex justify-center">
              <a href={media} target="_blank" rel="noopener noreferrer">
                <img src={media} alt="Media content" className="max-w-full max-h-[300px] object-cover" />
              </a>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 flex flex-col sm:flex-row gap-4 mt-2">
          <div className='flex items-center gap-2'>
            <div className={`flex rounded-full gap-1 cursor-pointer
              ${userVote === null ? 'bg-[#222020]' : ''}
              ${userVote === "upvote" ? 'bg-green-500 text-white' : ''}
              ${userVote === "downvote" ? 'bg-red-600 text-white' : ''}
            `}>
              <AiOutlineLike
                size={24}
                className={`p-1 rounded-full
                  ${userVote === null ? 'hover:text-green-600' : ''}
                  ${userVote === "upvote" ? 'text-green-500 bg-green-300' : ''}
                  ${userVote === "downvote" ? 'hover:bg-red-600' : ''}
                  duration-200
                `}
                onClick={() => handleVote("upvote")}
              />
              <Link to={`/post/${_id}`}>
                <p className='text-lg'>{voteNumber}</p>
              </Link>
              <AiOutlineDislike
                size={24}
                className={`p-1 rounded-full
                  ${userVote === null ? 'hover:text-red-600' : ''}
                  ${userVote === "downvote" ? 'text-red-500 bg-red-300' : ''}
                  ${userVote === "upvote" ? 'hover:bg-green-600' : ''}
                  duration-200
                `}
                onClick={() => handleVote("downvote")}
              />
            </div>
          </div>
          <Link to={`/post/${_id}`}>
            <div className='flex items-center bg-[#13181d] rounded-full gap-1 cursor-pointer pr-1'>
              <FaRegComment size={24} className='hover:text-blue-500 p-1 hover:bg-[#1c1a1a] rounded-full' />
              <p className='text-lg'>Comments</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
