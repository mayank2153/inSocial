import { Router } from "express";
import { verifyJWT } from '../middlewares/authjwt.middleware.js';
import { searchUsersAndPosts } from "../controllers/search.controller.js";
const searchRouter=Router();
searchRouter.route("/searchUsersAndPosts").get(verifyJWT,searchUsersAndPosts);
export default searchRouter