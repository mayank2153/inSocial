import mongoose,{Schema} from "mongoose";
const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String, //cloudinary Url
        required:true
    },
    coverImage:{
        type:String, //cloudinary Url
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)
export const User = mongoose.model("User",UserSchema)