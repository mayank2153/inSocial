import { Router } from 'express';
import { verifyJWT } from '../middlewares/authjwt.middleware.js';
import { createVote, deleteVote, getVotesByPost } from '../controllers/vote.controller.js';
const voteRouter=Router();
voteRouter.route("/create-vote/:postId").post(verifyJWT,createVote);
voteRouter.route("/get-votes/:postId").get(verifyJWT,getVotesByPost);
voteRouter.route("/delete-vote/:voteId").post(verifyJWT,deleteVote);
export default voteRouter;