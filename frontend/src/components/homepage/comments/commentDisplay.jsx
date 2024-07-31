import React, { useState } from 'react';
import CommentInputReply from './commentInputReply.jsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BsFillReplyFill } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";

const url = import.meta.env.VITE_BASE_URL|| `http://localhost:8000/`;

const CommentDisplay = ({ _id, content, deleted, parentCommentId, post, updatedAt, owner, replies }) => {
  const [isReplying, setIsReplying] = useState(false);
  const { postId } = useParams();
  const user = useSelector(state => state.auth.user?.data?.user?._id);

  const handleCommentDelete = async () => {
    try {
      console.log("Entered handleCommentDelete");
      const response = await axios.post(
        `${url}comments/delete-comment/${_id}`, 
        {}, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      // Optionally refresh the comments or update the UI
    } catch (error) {
      alert("Error deleting comment: " + (error.response?.data?.message || error.message));
      console.log(error);
    }
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  return (
    <div className="comment w-[500px] ml-4  text-white  rounded-2xl bg-[#13181d]">
      <div className='  py-2 px-4 rounded-2xl'>
        {owner && (
          <div className="owner-info flex items-center mb-4 gap-2 text-white">
            <img
              src={owner.avatar}
              alt={`Avatar of ${owner.userName}`}
              className="w-6 h-6 rounded-full mr-2"
            />
            <div>
              <span>{owner.userName}</span>
            </div>
            <p className='text-[10px]'>{new Date(updatedAt).toLocaleDateString()}</p>
          </div>
        )}
        {deleted ? (
          <div>
            <p>This comment is deleted</p>
          </div>
        ) : (
          <div>
            <p>{content}</p>
            <div className='flex'>
              <div>
              {!isReplying && (
                <div className='flex'>
                <BsFillReplyFill />
                <button onClick={handleReply} className="text-sm text-blue-500 hover:underline">
                Reply
              </button>
              </div>
              )}
            {isReplying && (
              <div className="reply-input">
                <CommentInputReply postId={postId} parentCommentId={parentCommentId || _id} {...owner} />
              </div>
            )}
              </div>
            {!isReplying &&owner._id === user && (
              <div className='flex'>
                <MdOutlineDeleteOutline />
                <button onClick={handleCommentDelete} className="text-sm text-red-500 hover:underline">Delete</button>
              </div>
            )}
            </div>
            
          </div>
          
        )}
      </div>
      {replies && replies.map((reply) => (
            <div>
              <CommentDisplay key={reply._id} {...reply} />
              </div>
          ))}
    </div>
  );
};

export default CommentDisplay;
