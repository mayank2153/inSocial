import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    description: {
        type: String
    },
    media: {
        type: String // cloudinary url
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    votes: [{
        type: Schema.Types.ObjectId,
        ref: "Vote"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

export const Post = mongoose.model("Post", PostSchema);
