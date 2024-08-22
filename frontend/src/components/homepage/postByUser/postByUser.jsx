import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import PostCard from "../postCard"
import axios from "axios";

const PostByUser = () => {
    const url = import.meta.env.VITE_BASE_URL ;
    const [posts, setPosts] = useState(null);
    const {userId} = useParams();
    console.log("user in front:",userId)
    const fetchUserPosts = async() => {
        try {
            const fetchedPosts = await axios.get(`${url}posts/user/${userId}`,{
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              });
            setPosts(fetchedPosts.data.data);
            console.log(fetchedPosts)
            console.log(fetchedPosts);            
        } catch (error) {
            console.log('there seems to be an error during fetching user posts' , error);
        }

    }

    useEffect( () => {
        fetchUserPosts();
    }, [userId]);

    return(
        <div className="flex flex-col   bg-[#0d1114] items-center w-full justify-center max-h-[100vh] overflow-y-scroll no-scrollbar overflow-x-hidden mt-[50px] mb-[50px] pt-[1500px]">
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
    )

}

export default PostByUser