import mongoose,{Schema} from "mongoose";
const VoteSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref:"Comment"
    },
    
    type:{
        type: String,
        required:true
    },
    
},{
    timestamps:true
})
export const Vote=mongoose.model("Vote",VoteSchema)