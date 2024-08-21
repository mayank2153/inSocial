import { Post } from "../models/post.model.js";
import { Vote } from "../models/votes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const createVote = asyncHandler(async (req, res) => {
    const { voteType } = req.body;
    const { postId } = req.params;
    const userId = req.user.id; 

    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        const user = User.findById(userId)
        const postOwner = post.owner;

        let vote = await Vote.findOne({ user: userId, post: postId });
        if (vote) {
            vote.voteType = voteType;
            await vote.save();
        } else {
            vote = await Vote.create({
                user: userId,
                post: postId,
                voteType: voteType
            });

            post.votes.push({
                voteId: vote._id,
                voteOwner: userId,
                voteType: voteType
            });

            await post.save();
        }
        req.app.get('io').emit('likePost', {
            message: `${user.userName} reacted on your post`,
            postId: postId,
            actor: userId,
            reciecer: postOwner,
            type: 'like'
        }) 

        return res.status(201).json(
            new ApiResponse(200, { vote, post }, "Vote has been successfully created")
        );
    } catch (error) {
        throw new ApiError(500, "Error creating vote: " + error.message);
    }
});

const deleteVote = asyncHandler(async (req, res) => {
    const { voteId } = req.params;
    const userId = req.user.id;

    try {
        const vote = await Vote.findById(voteId);
        if (!vote) {
            throw new ApiError(404, "Vote not found");
        }

        if (vote.user.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to delete this vote");
        }

        const post = await Post.findById(vote.post);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        await vote.deleteOne();

        // Remove the vote from post.votes array
        post.votes = post.votes.filter(v => v.voteId.toString() !== voteId);
        await post.save();

        return res.status(200).json(
            new ApiResponse(200, null, "Vote deleted successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Unable to delete vote: " + error.message);
    }
});

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
        throw new ApiError(500, "Error fetching votes: " + error.message);
    }
});

export {
    createVote,
    deleteVote,
    getVotesByPost
};
