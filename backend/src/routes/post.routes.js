import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { createNewPost, deletePost, fetchPosts, getPostById, getPostsByUser, updatePost,getPostsByCategory } from "../controllers/post.controller.js";
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
postRouter.route("/AllPosts").get(verifyJWT,fetchPosts);
postRouter.route("/getPost/:postId").get(verifyJWT,getPostById);
postRouter.route("/getPostsByCategory/:categoryId").get(verifyJWT,getPostsByCategory)
export default postRouter;