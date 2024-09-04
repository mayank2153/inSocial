
import { Post } from "../models/post.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"
import {Category} from "../models/category.model.js"



const createNewPost = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    console.log(category);

    if ([title, category, description].some((field) => field === "")) {
        throw new ApiError(400, "Please provide necessary details");
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
    if (req.files && Array.isArray(req.files.media) && req.files.media.length > 0) {
        mediapostLocalPath = req.files.media[0].path;
    }

    const cloudinaryMedia = mediapostLocalPath ? await uploadOnCloudinary(mediapostLocalPath) : null;
    if (mediapostLocalPath && !cloudinaryMedia) {
        throw new ApiError(400, "Unable to upload media");
    }

    const post = await Post.create({
        title: title,
        description: description,
        category: existingCategory._id,
        media: cloudinaryMedia?.url || "",
        owner: req.user._id,
    });

    const createdPost = await Post.findById(post._id);

    if (!createdPost) {
        throw new ApiError(500, "Something went wrong while creating a post");
    }

    return res.status(201).json(
        new ApiResponse(200, createdPost, "Post has been successfully created")
    );
});

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, description, category } = req.body;
    console.log("body:",req.body)
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

    // Update fields
    if (title) {
        post.title = title;
    }
    if (description) {
        post.description = description;
    }
    if (category) {
        console.log(category)
        const existingCategory = await Category.findById(category)
        if (!existingCategory) {
            throw new ApiError(400, "Category does not exist");
        }
        post.category = existingCategory._id;
    }
    // Save updated post
    console.log("updating post before saving")
    await post.save();
    console.log("updating post after saving")
    
    // Fetch updated post with populated category
    const updatedPost = await Post.findById(postId).populate('category');
    console.log("found post ")

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
        new ApiResponse(200, "User doesnt have any post.");
    }

    return res.status(200).json(
        new ApiResponse(200,posts,"Post has been successfully fetched")
    )
})

const fetchPosts=asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    let posts;
    if (user.likedCategories && user.likedCategories.length > 0) {
        // Fetch posts from liked categories
        posts = await Post.find({ category: { $in: user.likedCategories } }).sort({ createdAt: -1 });
    } else {
        // Fetch all posts
        posts = await Post.find({}).sort({ createdAt: -1 });
    }

    return res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));

})
const getPostById=asyncHandler(async(req,res)=>{
    const {postId}=req.params;
    try {
        const post = await Post.findById(postId);
        if(!post){
            throw new ApiError(404,"invalid postId")
        }
        return res.status(200).json(
            new ApiResponse(200,post,"post fetched successfully")
        )
    } catch (error) {
        throw new ApiError(409,error);
    }
})
const getPostsByCategory=asyncHandler(async(req,res)=>{
    const {categoryId}=req.params;
    try {
        const posts= await Post.find({category: categoryId});
        if(!posts){
            throw new ApiError(404,"unable to fetch posts")
        }
        return res.status(200).json(
            new ApiResponse(200,posts,"posts fetched successfully")
        )
    } 
    catch (error) {
        throw new ApiError(409,error);
    }
})
export {
    createNewPost,
    updatePost,
    deletePost,
    getPostsByUser,
    fetchPosts,
    getPostById,
    getPostsByCategory
}
