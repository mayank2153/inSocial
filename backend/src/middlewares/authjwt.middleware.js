import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log("1");

        const token = req.cookies?.accessToken || (req.header("Authorization")?.replace("Bearer ", "") ?? '');
        
        console.log("2");
        console.log("req.cookies:", req.cookies);
        console.log("Authorization header:", req.header("Authorization"));
        console.log("Token:", token);

        console.log("3");
        if (!token) {
            throw new ApiError(401, "Unauthorized Access: No token provided");
        }
        console.log("4");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new ApiError(401, "Invalid Access Token");
    }
});
