import { Router } from 'express';
import { createComment } from '../controllers/comments.controller.js';
import { verifyJWT } from '../middlewares/authjwt.middleware.js';
const commentRouter=Router();
commentRouter.route("/create-comment/:postId").post(verifyJWT,createComment);


export default commentRouter