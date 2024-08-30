import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentDisplay from "./commentDisplay";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { setComments } from "../../../utils/commentsSlice";
const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const ShowComments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}comments/get-comments/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        
        dispatch(setComments(response.data.data));
      } 
      catch (error) {
        console.error(error)
      } 
    };

    fetchComments();
  }, [postId]);


  return (
    <div className="min-w-[300px] lg:min-w-[650px]">
      {comments && comments.length>0 && comments.map((comment) => (
        <div key={comment._id} className="p-2 mt-4 break-words w-full">
          <CommentDisplay {...comment} />
        </div>
      ))}
    </div>
  );
};

export default ShowComments;
