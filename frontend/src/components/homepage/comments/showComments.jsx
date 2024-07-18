import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentDisplay from "./commentDisplay";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const ShowComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}comments/get-comments/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        
        setComments(response.data.data);
      } 
      catch (error) {
        console.error(error)
      } 
    };

    fetchComments();
  }, [postId]);


  return (
    <div>
      <h3>Comments</h3>
      {comments && comments.length>0 && comments.map((comment) => (
        <div key={comment._id} className="p-2 m-2 border-b">
          <CommentDisplay {...comment} />
        </div>
      ))}
    </div>
  );
};

export default ShowComments;
