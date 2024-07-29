import { useEffect, useState } from "react"
import CreatePost from "../../createPost/createPost.jsx"
import { getPostById } from "../../../api/getPostById.js";
const EditPost=(postId)=>{
    const [post,setPost]=useState(null);
    // useEffect(()=>{
    //     const fetchPost=async()=>{
    //         try {
    //             const post = await getPostById(postId)
    //         } catch (error) {
    //             setError('Error fetching post');
    //         console.error('Error fetching post details:', error);
    //         }
    //     }
    //     fetchPost()
    // },[post])
    // console.log(post)
    return(
        <div className="w-full">
            <CreatePost isEdit />
        </div>
    )
}
export default EditPost