const EmailChangeTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>New Email Verification</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="message">New Email Verification</div>
			 <div class="body">
                <p>Dear User,</p>
                <p>You have requested to change your email address on InSocial. To complete this change, please use the following OTP (One-Time Password) to verify your new email address:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 2 minutes. If you did not request this change, please disregard this email and make sure your account is secure.</p>
            </div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:developer@insocial.tech">developer@insocial.tech</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};

export default EmailChangeTemplate;