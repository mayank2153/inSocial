import { Router } from "express";
import { registerUser , loginUser , logOutUser , refreshAccessToken, addLikedCategories, removeLikedCategory, getUserById, editUser, updateCurrentPassword, ChangeCurrentEmail, forgetPassword, resetPassword, sendOtp, handleGoogleLogin } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/authjwt.middleware.js";
import passport from "passport";
const userRouter = Router();

userRouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT, logOutUser);
userRouter.route("/add-liked-categories").post(verifyJWT,addLikedCategories);
userRouter.route("/remove-liked-category").post(verifyJWT,removeLikedCategory);
userRouter.route("/get-user/:userId").get(verifyJWT,getUserById);
userRouter.route("/edit-user/:userId").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    verifyJWT,
    editUser
);
userRouter.route("/change-Current-Password/:userId").post(updateCurrentPassword);
userRouter.route("/change-current-Email/:userId").post(ChangeCurrentEmail);
userRouter.route("/forgetPassword").post(forgetPassword);

userRouter.route("/reset-password").post(resetPassword);
userRouter.route("/otp-request").post(sendOtp);


userRouter.get('/auth/google',
    passport.authenticate('google', {scope: ["profile","email"]})
);

userRouter.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: `${process.env.CORS_ORIGIN}` }),
    (req, res) => {
        const user = req.user; // Get the authenticated user from Passport
        handleGoogleLogin(user, res); // Use the new function
    }
);


userRouter.get('/auth/discord',
    passport.authenticate('discord')
)

userRouter.get('/auth/discord/redirect',
    passport.authenticate('discord'),
    (req, res) => {
        res.send("Authentication successfull")
    }
)

export default userRouter;