import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

const mailSender = async(email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.COMPANY_MAIL,
                pass: process.env.COMPANY_PASSWORD
            }  
        })

        const mailOptions = {
            from: `${process.env.COMPANY_MAIL}`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            // res.status(200).json({
            //     message: `Email has been sent to ${email}. Please Follow the instructions.`,
            // });
        } catch (error) {
            console.error('Error sending email:', error);
            throw new ApiError(500, 'Error in sending mail', error.message);
        }
    } catch (error) {
        console.log(error.message);
           
    }
}

export default mailSender