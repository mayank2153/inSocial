import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("token"+token)
        if(!token) {
            throw new ApiError(401, "Unauthorized Access")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("decoded token:",decodedToken)
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
        console.log("user:",user)
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "INVALID ACCESS TOKEN")
    }
})