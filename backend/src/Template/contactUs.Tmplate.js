const contactUsTemplate = (name, email, message) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>New Contact Us Message</title>
        <style>
            body {
                background-color: #f8f8f8;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
    
            .header {
                font-size: 24px;
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
                background-color: #FFD60A;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
                margin-top: 10px;
                color: #000000;
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
            <div class="header">New Contact Us Message</div>
            <div class="body">
                <p>Dear Admin,</p>
                <p>You have received a new message from <span class="highlight">${name}</span> (<a href="mailto:${email}">${email}</a>) via the Contact Us form on your website:</p>
                <p class="highlight">"${message}"</p>
                <p>Please respond to this inquiry at your earliest convenience.</p>
            </div>
        </div>
    </body>
    
    </html>`;
};

export default contactUsTemplate;
