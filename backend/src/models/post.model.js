import mongoose,{Schema} from "mongoose";
const PostSchema=new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    description:{
        type:"String"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    media:{
        type:"String", //Cloudinary Url
        trim: true
    },
    upvotesCount: {
        type: Number,
        default: 0
    },
    downvotesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
},{
    timestamps:true
})
export const Post=mongoose.model("Post",PostSchema)