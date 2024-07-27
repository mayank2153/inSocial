import { Router } from "express";
import { registerUser , loginUser , logOutUser , refreshAccessToken, addLikedCategories, removeLikedCategory, getUserById, editUser } from "../controllers/user.controller.js"
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
userRouter.get('/auth/google',
    passport.authenticate('google', {scope: ["profile","email"]})
);

userRouter.get('/auth/google/redirect',
    passport.authenticate("google" , {failureRedirect: "/login"})
)

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