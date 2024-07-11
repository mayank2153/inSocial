import {User} from "../models/user.model.js"
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
        parentCommentId:parentCommentPosted,
        deleted: false
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
const deleteComment=asyncHandler(async(req,res)=>{
    const {commentId}=req.params;
    try {
        const comment=await Comment.findById(commentId);
        if(!comment){
            throw new ApiError(404,"unable to find comment")
        }
        const owner=await User.findById(comment.owner);
        if(!owner){
            throw new ApiError(404,"unable to find creator of comment")
        }
        if(comment.owner.toString()!==req.user.id){
            throw new ApiError(403,"you are not authorized to delete this comment")
        }
        comment.deleted=true;
        await comment.save();
        return res.status(200).json(
            new ApiResponse(200, null, "comment has been successfully deleted")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while deleting the comment")
        );
    }
})
const getCommentsByPost=asyncHandler(async(req,res)=>{
    const {postId}=req.params;
    try {
        const comments=await Comment.find({post:postId});
        if(!comments){
            throw new ApiError(404,"unable to find comments")
        }
        return res.status(200).json(
            new ApiResponse(200, comments, "comments has been successfully fetched")
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while fetching the comments")
        );
    }
})
const getCommentById=asyncHandler(async(req,res)=>{
    const {commentId}=req.params;
    try {
        const comment=await Comment.findById(commentId);
        if(!comment){
            throw new ApiError(404,"unable to find comment")
        }
        return res.status(200).json(
            new ApiResponse(200,comment,"comment fetched successfully")
        )
    } catch (error) {
        
    }
})
export{
    createComment,
    deleteComment,
    getCommentsByPost,
    getCommentById
}