import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { connectSocket } from "../../../utils/socketslice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../utils/commentsSlice.jsx";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const CommentInput = ({ postId }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const userName = useSelector((state) => state.auth.user?.data?.user?.userName);
  const userId = useSelector((state) => state.auth.user?.data?.user?._id);

  // const userData = useSelector((state) => state.auth.user)
  // console.log('data',userData);
  
  useEffect(() => {
    if (!socket) {
      console.log("Socket not connected, dispatching connectSocket");
      dispatch(connectSocket());
    } else {
      console.log("Socket already connected");
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const handleComment = async () => {
    try {
      const response = await axios.post(
        `${url}comments/create-comment/${postId}`,
        { content: comment },
        { withCredentials: true }
      );

      setComment(""); // Clear the comment input after successful submission
      setIsInputFocused(false);
      console.log("Comment generated successfully:", response.data);
      dispatch(addComment(response.data.data))
      console.log("socket:,",socket)
      if (socket) {
        const emitData = {
          message: `User ${userName} commented on your post`,
          postId: postId,
          actor: userId,
          receiver: response?.data?.data?.postOwner,
          type: 'comment',
        };

        console.log("Emitting socket event with data:", emitData);
        socket.emit('commentPost', emitData);
        console.log("Comment emitted successfully", emitData);
      } else {
        console.warn("Socket is not connected, cannot emit event.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error); // Log the entire error object for debugging
      alert(error.response?.data?.message || "Unable to add comment");
    }
  };

  return (
    <div
      className={`flex flex-col items-center  mt-4 border border-gray-600 py-2 px-4 m-2 bg-[#0d1114] transition-all duration-200 ${
        isInputFocused ? "rounded-2xl" : "rounded-full"
      } min-w-[300px] lg:min-w-[650px]`}
    >
      <textarea
        ref={textareaRef}
        placeholder="Add a comment"
        className={` bg-[#0d1114] w-full focus:outline-none text-white transition-all duration-200 resize-none overflow-y-scroll max-h-40 no-scrollbar`}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
      />
      <div className="flex justify-end bg-[#0d1114] w-full">
        {isInputFocused && (
          <button
            className="items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:bg-blue-700 mt-2"
            onClick={handleComment}
          >
            Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
