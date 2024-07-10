import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { createNewPost, deletePost, getPostsByUser, updatePost } from "../controllers/post.controller.js";
import {verifyJWT} from "../middlewares/authjwt.middleware.js";

const postRouter = Router();


postRouter.route("/create-post").post(verifyJWT,
    upload.fields([{
        name: "media",
        maxCount: 1
    }]),
    createNewPost
);

postRouter.route("/delete-post/:postId").post(verifyJWT,deletePost);
postRouter.route("/update-post/:postId").put(verifyJWT,updatePost);
postRouter.route("/user/:userId").get(verifyJWT,getPostsByUser);
export default postRouter;