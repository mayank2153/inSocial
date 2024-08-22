import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchPostsByCategory } from "../../../api/fetchPostsByCategory"
import PostCard from "../postCard"
import Shimmer from "../../shimmer/shimmer"
const PostByCategory=()=>{
    const [posts,setPosts]=useState(null)
    const {categoryId}=useParams();
    useEffect(()=>{
        const fetchPosts=async()=>{
            try {
                const fetchedPosts=await fetchPostsByCategory({categoryId});
                setPosts(fetchedPosts);
                console.log(fetchedPosts)
            } catch (error) {
                setError('Error fetching details');
            console.error('Error fetching details:', error);
            }
        }
        fetchPosts();
    },[categoryId])
    if(!posts){
      return(
        <Shimmer/>
      )
    }
    return(
        <div className="flex flex-col  bg-[#0d1114] items-center w-full justify-center h-[100vh] overflow-y-scroll no-scrollbar overflow-x-hidden   ">
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
export default PostByCategory