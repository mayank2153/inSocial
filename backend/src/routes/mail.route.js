import { Router } from "express";
import { MailReciever, UserAcknowledgment } from "../controllers/mail.controller.js";

const mailRouter = Router();

mailRouter.route('/contactus').post(MailReciever);
mailRouter.route('/acknowledgement').post(UserAcknowledgment);

export default mailRouter