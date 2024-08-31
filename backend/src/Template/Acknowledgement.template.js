const FeedbackAcknowledgmentTemplate = (name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Thank You for Your Feedback</title>
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
                color: #444444;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left;
            }
    
            .highlight {
                font-weight: bold;
                color: #FFD60A;
            }
    
            .footer {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
                text-align: center;
            }
    
            .footer a {
                color: #FFD60A;
                text-decoration: none;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="message">Thank You for Your Feedback, ${name}</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>We sincerely appreciate you taking the time to share your feedback with us. Your thoughts and suggestions are invaluable in helping us improve our services and provide a better experience for our users.</p>
                <p>Please be assured that your query or suggestion will be reviewed by our team, and we will address it at the earliest opportunity.</p>
                <p>Should you have any further comments or questions, feel free to reach out to us at any time.</p>
                <p>Thank you once again for your valuable input.</p>
            </div>
            <div class="footer">
                If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:developer@insocial.tech">developer@insocial.tech</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};

export default FeedbackAcknowledgmentTemplate;
