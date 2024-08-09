import { Router } from 'express';
import { sendMessage,getMessages } from '../controllers/message.controller.js';
import {verifyJWT} from "../middlewares/authjwt.middleware.js";
const messageRouter=Router()
messageRouter.route("/").post(verifyJWT,sendMessage);
messageRouter.route("/:conversationId").get(verifyJWT,getMessages);
export default messageRouter