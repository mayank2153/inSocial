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

const createNewPost  =  asyncHandler(async(req, res) => {
    const {title, description, category, media} = req.body

    if(
        [title, category, description].some((field) => field?.trim() === "") 
    ){
        throw new ApiError(400, "please provide neccessary details")
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
        title : title.toLowerCase(),
        description : description.toLowerCase(),
        category : category.toLowerCase(),
        media : cloudinaryMedia?.url || ""
    })

    const createdpost = await Post.findById(post._id)

    if(!createdpost){
        throw new ApiError(500, "something went wrong while creating a Post")
    }

    return res.status(201).json(
        new ApiResponse(200, createdpost , "post has been successfully created")
    )

})

const updatePost = asyncHandler(async(req, res) => {
    const { id } = req.params
    const {title, description, category } = req.body

    // check valid input
    if ([title, description, category].some((field) => field && field.trim() === "")) {
        throw new ApiError(400, "Please provide necessary details");
    }

    const post = await Post.findById(id)

    if(!post){
        throw new ApiError(404, "post not found || there is some error in finding post")
    }

    // update media if present:
    if(req.files && Array.isArray(req.files.media) && req.files.media.length > 0){
        const mediapostLocalPath = req.files.media[0].path;
        const cloudinaryMedia = await uploadOnCloudinary(mediapostLocalPath);
        if(!cloudinaryMedia){
            throw new ApiError(500, "Failed to upload media")
        }

        post.media = cloudinaryMedia.url;
    }

    if(title) {
        post.title = title.toLowerCase();
    }
    if(description){
        post.description = description.toLowerCase();
    }
    if(category){
        post.category = category.toLowerCase();
    }

    await post.save();

    const updatedPost = await Post.findById(id);

    return res.status(200).json(
        new ApiResponse(200, updatePost, "Post has been successfully updated")
    )
})


const deletePost = asyncHandler(async(req, res) => {
    const {id} = req.params

    const post = await Post.findById(id);
    if(!post){
        throw new ApiError(400, "post does not exists")
    }

    await post.remove()

    return res.status(201).json( 
         new ApiResponse(200,null ,"Post has been successfully deleted")
    )
})
export {
    createNewPost,
    updatePost,
    deletePost,
}

