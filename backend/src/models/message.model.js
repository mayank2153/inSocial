
import mongoose,{Schema} from "mongoose";
const messageSchema=new Schema({
    conversationId:{
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)
export const Message=mongoose.model("Message",messageSchema);