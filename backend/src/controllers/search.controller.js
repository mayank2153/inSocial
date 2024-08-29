import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const searchUsersAndPosts=asyncHandler(async(req,res)=>{
    const {query}=req.query;
    try {
        const posts=await Post.find({title: {$regex:query,$options:'i'}});
        const users=await User.find({userName: {$regex:query,$options:'i'}});
        return res.status(200).json(
            new ApiResponse(200,{posts,users},"Search Successfull")
        )
    } catch (error) {
        throw new ApiError(500,'Unexpected Error',error);
    }
})
export {
    searchUsersAndPosts
}