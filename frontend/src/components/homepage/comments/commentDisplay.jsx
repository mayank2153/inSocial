import React, { useState } from 'react';
import CommentInputReply from './commentInputReply.jsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BsFillReplyFill } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GoReply } from "react-icons/go";

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
    <div className="comment lg:ml-4 ml-2 text-white rounded-2xl bg-[#0d1114] w-full break-words">
  <div className='py-2 px-4 rounded-2xl'>
    {owner && (
      <div className="owner-info flex items-center gap-2 text-white">
        <img
          src={owner.avatar}
          alt={`Avatar of ${owner.userName}`}
          className="w-8 h-8 rounded-full mr-2 border-2 border-black"
        />
        <div>
          <span>{owner.userName}</span>
        </div>
        <p className='text-[10px]'>{new Date(updatedAt).toLocaleDateString()}</p>
      </div>
    )}
    {deleted ? (
      <div>
        <p className='text-sm text-gray-400 pl-1 pt-1 ml-12 -mt-2'>This comment is deleted</p>
      </div>
    ) : (
      <div>
        <p className='text-sm ml-12 -mt-2 pl-1 pt-1 text-gray-200'>
          {content}
        </p>
        <div className='flex gap-6 pt-3'>
          <div className='ml-12 -mt-2'>
            {!isReplying && (
              <div className='flex gap-1'>
                <GoReply className='text-xl text-gray-500' />
                <button onClick={handleReply} className="text-sm hover:underline transition-all duration-300">
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
          {!isReplying && owner._id === user && (
            <div className='flex gap-1 -mt-2'>
              <MdOutlineDeleteOutline className='text-xl text-gray-500' />
              <button onClick={handleCommentDelete} className="text-sm">Delete</button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
  {replies && replies.map((reply) => (
    <div key={reply._id}>
      <CommentDisplay {...reply} />
    </div>
  ))}
</div>

  );
};

export default CommentDisplay;
