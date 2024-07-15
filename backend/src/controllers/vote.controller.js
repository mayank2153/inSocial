import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js"
import { Vote } from "../models/votes.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createVote=asyncHandler(async(req,res)=>{
    const {voteType}=req.body;
    const {postId}=req.params;
    const userId=req.user.id;
    try {
        const post = await Post.findById(postId);
        if(!post){
            throw new ApiError(404,"Post not found")
        }
        let vote = await Vote.findOne({user: userId, post:postId});
        if(vote){
            vote.voteType=voteType;
            await vote.save();
            post.votes.push({ voteId: vote._id, voteOwner: userId, voteType: voteType });
            await post.save();
        }
        else{
            vote=await Vote.create({
                user:userId,
                post:postId,
                voteType:voteType
            });
            await vote.save();
            post.votes.push({ voteId: vote._id, voteOwner: userId, voteType: voteType });
            console.log(post.votes)
            await post.save();
        }
        return res.status(201).json(
            new ApiResponse(200, vote , "vote has been successfully created")
        )
    } catch (error) {
        throw new ApiError(500, "Error finding category in database");
    }
})
const deleteVote=asyncHandler(async(req,res)=>{
    const {voteId}=req.params;
    const userId=req.user.id;
    try {
        const vote = await Vote.findById(voteId);
        if (!vote) {
            throw new ApiError(404, "Vote not found");
        }
    
        if (vote.user.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to delete this vote");
        }
        const post = await Post.findById(vote.post);
        if(!post){
            throw new ApiError(404,"Post not found")
        }
        await vote.deleteOne();
        
        post.votes.pull(voteId);
        await post.save();

        return res.status(201).json(
            new ApiResponse(200,null,"vote deleted successfully")
        )
    } catch (error) {
        throw new ApiError(500,"Unable to delete vote"+error)
    }
})
const getVotesByPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        const upvotes = await Vote.find({ post: postId, voteType: 'upvote' }).populate('user', 'userName email');
        const downvotes = await Vote.find({ post: postId, voteType: 'downvote' }).populate('user', 'userName email');

        const upvotesCount = upvotes.length;
        const downvotesCount = downvotes.length;

        return res.status(200).json(
            new ApiResponse(200, { upvotes: { count: upvotesCount, users: upvotes }, downvotes: { count: downvotesCount, users: downvotes } }, "Votes have been successfully fetched")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while fetching the votes: " + error.message)
        );
    }
});
export {
    createVote,
    deleteVote,
    getVotesByPost
}