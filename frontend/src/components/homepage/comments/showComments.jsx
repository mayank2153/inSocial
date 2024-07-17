import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentDisplay from "./commentDisplay";

const url = import.meta.env.VITE_BASE_URL;

const ShowComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}comments/get-comments/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        console.log(response.data.data)
        setComments(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching comments: {error}</div>;
  }

  if (!comments.length) {
    return <div>No comments to display</div>;
  }

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="p-2 m-2 border-b">
          <CommentDisplay {...comment} />
        </div>
      ))}
    </div>
  );
};

export default ShowComments;
