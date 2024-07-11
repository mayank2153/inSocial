import { Router } from 'express';
import { createComment, deleteComment, getCommentById, getCommentsByPost } from '../controllers/comments.controller.js';
import { verifyJWT } from '../middlewares/authjwt.middleware.js';
const commentRouter=Router();
commentRouter.route("/create-comment/:postId").post(verifyJWT,createComment);
commentRouter.route("/delete-comment/:commentId").post(verifyJWT,deleteComment);
commentRouter.route("/get-comments/:postId").get(verifyJWT,getCommentsByPost);
commentRouter.route("/get-comment/:commentId").get(verifyJWT,getCommentById);

export default commentRouter