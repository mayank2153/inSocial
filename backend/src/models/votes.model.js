import mongoose,{Schema} from "mongoose";
const VoteSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required: true
    },
    voteType: {
        type: String,
        enum: ["upvote", "downvote"],
        required: true
    }
    
},{
    timestamps:true
})
export const Vote=mongoose.model("Vote",VoteSchema)