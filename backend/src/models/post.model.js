import mongoose,{Schema} from "mongoose";
const PostSchema=new Schema({
    title:{
        type:"String",
        required:"true"
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
    }
},{
    timestamps:true
})
export const Post=mongoose.model("Post",PostSchema)