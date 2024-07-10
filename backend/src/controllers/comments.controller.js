
import { Post } from "../models/post.model.js"
import { Comment } from "../models/comments.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createComment=asyncHandler(async(req,res)=>{
    const {content,parentCommentId}=req.body;
    const {postId}=req.params;
    const userId=req.user.id;
    const post=await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found or there was an error in finding the post");
    }
    let parentCommentPosted=null;
    if (parentCommentId){
        const parentComment=await Comment.findById(parentCommentId);
        if(!parentComment){
            throw new ApiError(404,"Parent comment not found or there was an error in finding the parent comment")
        }
        parentCommentPosted=parentCommentId;
    }
    const comment=await Comment.create({
        content:content,
        owner: userId,
        post: postId,
        parentCommentId:parentCommentPosted
    })
    const createdComment = await Comment.findById(comment._id)

    if(!createdComment){
        throw new ApiError(500, "something went wrong while creating a Comment")
    }

    // Push the comment ID to the post's comments array
    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json(
        new ApiResponse(200, createdComment , "Comment has been successfully created")
    )
})

export{
    createComment
}