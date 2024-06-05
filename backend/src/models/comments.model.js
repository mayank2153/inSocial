import mongoose,{Schema} from "mongoose";
const CommentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required:true
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment" // Reference to the Comment model itself
    }
    
},{
    timestamps:true
}
)
export const Comment = mongoose.model("Comment",CommentSchema)