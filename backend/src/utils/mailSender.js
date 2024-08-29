import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'us2.smtp.mailhostbox.com', 
            port: 587, // Port for STARTTLS
            secure: false, 
            auth: {
                user: process.env.COMPANY_MAIL, // Your email address
                pass: process.env.COMPANY_PASSWORD, // Your email password
            },
            tls: {
                rejectUnauthorized: false, 
            },
        });

        // Mail options
        const mailOptions = {
            from: `${process.env.COMPANY_MAIL}`, 
            to: `${email}`, 
            subject: `${title}`, 
            html: `${body}`, 
        };

        
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            
        } catch (error) {
            console.error('Error sending email:', error);
            throw new ApiError(500, 'Error in sending mail', error.message);
        }
    } catch (error) {
        console.log(error.message);
        // Handle errors that occur during transporter creation or other setup issues
    }
}

export default mailSender;