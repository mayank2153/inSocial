import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { fetchOwnerDetails } from '../../api/fetchOwnerDetails.js';
import { fetchCategoryDetails } from '../../api/fetchCategoryDetails.js';
import { MdEdit } from "react-icons/md";
// import { connectSocket } from '../../utils/socketslice.jsx';
import { useSocket } from "../context/SocketContext.jsx";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const PostCard = ({ title, description, owner, votes, updatedAt, media, comments, category, _id,bgColor="#13181d" }) => {
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const voteCount = votes.length;
  const [voteNumber, setVoteNumber] = useState(voteCount);

  // const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const currentUser = userData?.data?.user?userData?.data?.user?._id:userData?.data?._id;
  const userName =userData?.data?.user?userData?.data?.user?.userName:userData?.data?.userName;
  
  const isConnected = useSelector((state) => state.socket.isConnected);
  const socket = useSocket();
  
  useEffect(() => {
    if (!isConnected) {
        if(socket){
          socket.connect();
        }
    }
  }, [socket]);


  useEffect(() => {
    if (currentUser) {
      const userVote = votes.find(vote => vote.voteOwner === currentUser);
      if (userVote) {
        setUserVote(userVote.voteType);
      }
    }
  }, [currentUser, votes]);

  const handleVote = async (voteType) => {
    if (userVote) {
      // If the user is clicking the same vote type again, remove the vote
      const voteId = votes.find(vote => vote.voteOwner === currentUser)?.voteId;
      
      await removeVote(voteId);
      setUserVote(null);
      setVoteNumber(voteNumber - 1);
    } else {
      // Otherwise, cast the vote
      try {
        
        const response = await axios.post(`${url}vote/create-vote/${_id}`, { voteType }, {
          withCredentials: true
        });
        setUserVote(voteType);
        
        
        
        try {
          if (socket) {
            const emitData = {
              message: `User ${userName} reacted on your post`,
              postId: _id,
              actor: currentUser,
              receiver: owner,
              type: 'like'
            };
            
            socket.emit('likePost', emitData);
            
            
          }
        } catch (error) {
        console.error('socket error: ' + error);
        
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
    <div className="post-card  rounded-lg py-1  w-full lg:max-w-[650px] min-w-[300px] lg:min-w-[650px]" style={
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
                <img src={media} alt="Media content" className="max-w-full max-h-[220px] object-cover" />
              </a>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 flex items-center sm:flex-row gap-4 mt-2">
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
            <div className='flex items-center bg-[#13181d]  gap-1 cursor-pointer  rounded-full hover:text-blue-500 hover:bg-[#1c1a1a]'>
              <FaRegCommentAlt size={25} className=' p-1  ' />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
