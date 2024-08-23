import { Router } from "express";
import {verifyJWT} from "../middlewares/authjwt.middleware.js";
import { getNotifications } from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.route('/notifications/:userId').get(getNotifications);

export default notificationRouter;