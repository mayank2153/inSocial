
import { Router } from 'express';
import { createConversation, getConversations } from '../controllers/conversation.controller.js';
import { verifyJWT } from '../middlewares/authjwt.middleware.js';

const conversationRouter = Router();

conversationRouter.post('/',verifyJWT, createConversation);
conversationRouter.get('/:userId',verifyJWT, getConversations);

export default conversationRouter;
