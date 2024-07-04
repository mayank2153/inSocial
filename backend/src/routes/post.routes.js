import {Router} from "express"
import { upload } from "../middlewares/multer.middleware";
import { createNewPost, deletePost, updatePost } from "../controllers/post.controller";

const postRouter = Router();


postRouter.route("/create-post").post(
    upload.fields({
        name: "media",
        maxCount: 1
    }),
    createNewPost
);

postRouter.route("/delete-post").post(deletePost);
postRouter.route("/update-post").post(updatePost);