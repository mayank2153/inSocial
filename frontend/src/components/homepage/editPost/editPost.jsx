import { useEffect, useState } from "react"
import CreatePost from "../../createPost/createPost.jsx"
import { getPostById } from "../../../api/getPostById.js";
const EditPost=(postId)=>{
    const [post,setPost]=useState(null);

    return(
        <div className="w-full">
            <CreatePost isEdit />
        </div>
    )
}
export default EditPost