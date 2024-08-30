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
export default PostByCategory