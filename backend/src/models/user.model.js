import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const UserSchema = new Schema(
    {
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

        },
        password:{
        type:String,
        required:true
        },
        bio :{
            type:String,
            default:""
        },
        refreshToken: {
            type : String,
        } 
    },{
        timestamps:true
    }
);

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


UserSchema.methods.isPasswordCorrect  = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id:this._id,
            email: this.email,
            username: this.username

        },
         
        process.env.ACCESS_TOKEN_SECRET, 
        
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username
    },

    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)}

export const User = mongoose.model("User",UserSchema)