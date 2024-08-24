import mongoose, {Schema} from "mongoose";
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../Template/emailVerification.Template.js";

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
    }
});

async function sendVerificationEmail(email, otp){
    try {
        const mailResponsne = await mailSender(
            email,
            "OTP for email verification",
            otpTemplate(otp)
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
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

export const OTP = mongoose.model("OTP", otpSchema);