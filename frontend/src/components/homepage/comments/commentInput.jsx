import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

const CommentInput = ({ postId }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const handleComment = async () => {
    try {
      const response = await axios.post(`${url}comments/create-comment/${postId}`, { content: comment }, { withCredentials: true });
      setComment(""); // Clear the comment input after successful submission
      setIsInputFocused(false)
      console.log("comment generated", response);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add comment");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg border-2 border-black rounded-full m-2 py-2 px-6">
      <textarea
        ref={textareaRef}
        placeholder="Add a comment"
        className={`w-full focus:outline-none p-2 rounded-full transition-all duration-200 resize-none ${
          isInputFocused ? 'h-14' : 'h-12'
        }`}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
      />
      {isInputFocused && (
        <button
          className="items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:bg-blue-700 mt-2"
          onClick={handleComment}
        >
          Comment
        </button>
      )}
    </div>
  );
};

export default CommentInput;
