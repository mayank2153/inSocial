import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import PostCard from "../postCard"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostByUser = () => {
    const url = import.meta.env.VITE_BASE_URL ;
    const [posts, setPosts] = useState(null);
    const {userId} = useParams();
    const navigate = useNavigate();

    const fetchUserPosts = async() => {
        try {
            const fetchedPosts = await axios.get(`${url}posts/user/${userId}`,{
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              });
            setPosts(fetchedPosts.data.data);
            
        } catch (error) {
            console.error('there seems to be an error during fetching user posts' , error);
            navigate('/login')
        }

    }

    useEffect( () => {
        fetchUserPosts();
    }, [userId]);

    return(
      <div className="flex flex-col bg-[#0d1114] w-full max-h-screen overflow-y-auto items-center no-scrollbar py-8  lg:px-8 px-2 ">
      <div className="w-full max-w-screen-sm ">
        <div className="rounded-2xl  p-1 py-2 space-y-4">
        {
          posts ? (
            posts.map((item) => (
              <PostCard key={item._id} {...item} />
            ))
          ) : (
            <div>No posts available</div>
          )
        }
        </div>
      </div>
    </div>
        
    )

}

export default PostByUser