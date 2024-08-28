import { Router } from "express";
import {verifyJWT} from "../middlewares/authjwt.middleware.js";
import { getNotifications, getUnreadNotificationCount, updateReadCount } from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.route('/notifications/:userId').get(getNotifications);
notificationRouter.route('/unread-count/:userId').get(getUnreadNotificationCount);
notificationRouter.route('/update-notification-count/:userId').post(updateReadCount);

export default notificationRouter;