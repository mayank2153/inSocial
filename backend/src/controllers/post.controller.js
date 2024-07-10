/**
 * steps need in writing a post controller:
 * verify if the user is logged in or not?
 * if not throw error
 * if logged in :
 *  1. take title , description and body/image both
 * 
 */

import { Post } from "../models/post.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"
import {Category} from "../models/category.model.js"


const createNewPost  =  asyncHandler(async(req, res) => {

    
    const {title, description, category} = req.body
    console.log(category);
    if(
        [title, category, description].some((field) => field?.trim() === "") 
    ){
        throw new ApiError(400, "please provide neccessary details")
    }
    let existingCategory;
    try {
        existingCategory = await Category.findOne({ name: category });
        if (!existingCategory) {
            throw new ApiError(400, "Category does not exist");
        }
    } catch (error) {
        throw new ApiError(500, "Error finding category in database");
    }

    let mediapostLocalPath;
    if(req.files && Array.isArray(req.files.media) && req.files.media.length > 0){
        mediapostLocalPath = req.files.media[0].path;
    }


    const cloudinaryMedia = await uploadOnCloudinary(mediapostLocalPath);
    if(!cloudinaryMedia){
        throw new ApiError(400, "unable to upload media")
    }

    const post = await Post.create({
        title : title,
        description : description,
        category: existingCategory._id,
        media : cloudinaryMedia?.url || "",
        owner: req.user._id
    })

    const createdpost = await Post.findById(post._id)

    if(!createdpost){
        throw new ApiError(500, "something went wrong while creating a Post")
    }

    return res.status(201).json(
        new ApiResponse(200, createdpost , "post has been successfully created")
    )

})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, description, category } = req.body;
    console.log('Request Body:', req.body);
    // Check valid input
    if ([title, description, category].some(field => field && field.trim() === "")) {
        throw new ApiError(400, "Please provide necessary details");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found or there was an error in finding the post");
    }

    // Update media if present
    if (req.files && Array.isArray(req.files.media) && req.files.media.length > 0) {
        const mediaLocalPath = req.files.media[0].path;
        const cloudinaryMedia = await uploadOnCloudinary(mediaLocalPath);
        if (!cloudinaryMedia) {
            throw new ApiError(500, "Failed to upload media");
        }
        post.media = cloudinaryMedia.url;
    }

    console.log("title provided:",title);
    console.log("title old:",post.title);
    // Update fields
    if (title) {
        post.title = title;
    }
    if (description) {
        post.description = description;
    }
    if (category) {
        const existingCategory = await Category.findOne({ name: category.toLowerCase() });
        if (!existingCategory) {
            throw new ApiError(400, "Category does not exist");
        }
        post.category = existingCategory._id;
    }
    // Save updated post
    await post.save();

    // Fetch updated post with populated category
    const updatedPost = await Post.findById(postId).populate('category');

    return res.status(200).json(
        new ApiResponse(200, updatedPost, "Post has been successfully updated")
    );
});


const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
        throw new ApiError(404, "Post not found..");
    }


    return res.status(200).json(
        new ApiResponse(200, null, "Post has been successfully deleted")
    );
});

const getPostsByUser= asyncHandler(async(req,res)=>{
    const {userId}=req.params;
    const posts=await Post.find({owner:userId});
    if (posts.length === 0) {
        throw new ApiError(404, "No posts found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200,posts,"Post has been successfully fetched")
    )
})

export {
    createNewPost,
    updatePost,
    deletePost,
    getPostsByUser
}

