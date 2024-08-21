import mongoose, {Schema} from "mongoose";

const notificationSchema = new Schema({
    reciever: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment'],
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    message:{
        type: String,
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    },
    
    },{
        timestamps: true
})

export const Notification = mongoose.model("Notification", notificationSchema);