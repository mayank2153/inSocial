import { User } from "../models/user.model.js";
import FeedbackAcknowledgmentTemplate from "../Template/Acknowledgement.template.js";
import contactUsTemplate from "../Template/contactUs.Tmplate.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

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


const MailReciever = asyncHandler(async (req, res) => {
    const {name, email, subject, message} = req.body;

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404, "Incorrect Email");
    }

    const mailOptions = {
        from: process.env.COMPANY_MAIL,  // Your company's email
        to: process.env.COMPANY_MAIL,    // Send to your company's support email
        subject: `${subject}`,  // The subject of the email
        html: contactUsTemplate(name, message, email),  // The HTML template for the email content
        replyTo: email  // The user's email for replies
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log('Email sent: ' + info.response);

        return res.status(200).json(
            new ApiResponse(200, 'Email sent successfully', null)
        )
        
    } catch (error) {
        console.error('Error sending email:', error);
        throw new ApiError(500, 'Error in sending mail', error.message);
    }


});

const UserAcknowledgment = asyncHandler(async(req,res) => {
    const {name, email, subject, message} = req.body;

    const mailOptions = {
        from: process.env.COMPANY_MAIL,  // Your company's email
        to: email,    // Send to the user's email
        subject: ` ${subject}`,  // The subject of the email
        html: FeedbackAcknowledgmentTemplate(name),  // The HTML template for the email content
        replyTo: process.env.COMPANY_MAIL  // The company's email for replies
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log('Email sent: ' + info.response);

        return res.status(200).json(
            new ApiResponse(200, 'Email sent successfully', null)
        )
        
    } catch (error) {
        console.error('Error sending email:', error);
        throw new ApiError(500, 'Error in sending mail', error.message);
    }
})

export {
    MailReciever,
    UserAcknowledgment
}