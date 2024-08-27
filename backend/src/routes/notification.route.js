import { Router } from "express";
import {verifyJWT} from "../middlewares/authjwt.middleware.js";
import { getNotifications, getUnreadNotificationCount } from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.route('/notifications/:userId').get(getNotifications);
notificationRouter.route('/notification/unread-count/:userId').get(getUnreadNotificationCount);

export default notificationRouter;