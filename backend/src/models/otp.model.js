import mongoose, {Schema} from "mongoose";
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../Template/emailVerification.Template.js";
import EmailChangeTemplate from "../Template/emailChange.template.js";
import { ApiError } from "../utils/ApiError.js";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        default: Date.now,
        expires: 60*2, //will be expired after 2 minutes.
    },
    scenario: {
        type: String,
        required: true,
        enum: ["registration", "passwordReset", "emailChange"]
    }
});

async function sendVerificationEmail(email, otp, scenario){
    try {

        let emailTemplate;
        let subject;

        switch(scenario){
            case "registration":
                emailTemplate = otpTemplate(otp);
                subject = "OTP for email verification";
                break;
            // case "passwordReset":
            //     emailTemplate = otpTemplate(otp);
            //     subject = "OTP for email verification";
            //     break;
            case "emailChange":
                emailTemplate = EmailChangeTemplate(otp);
                subject = "OTP for email verification";
                break;
            default:
                throw new ApiError(400, "Invalid scenerio");
        }
        const mailResponsne = await mailSender(
            email,
            subject,
            emailTemplate
        );
        console.log('Email sent successfully',mailResponsne);
    } catch (error) {
        console.log('error occured while sending email', error);
        
    }
}

otpSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp, this.scenario);
	}
	next();
});

export const OTP = mongoose.model("OTP", otpSchema);