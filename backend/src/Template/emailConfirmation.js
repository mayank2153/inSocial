const EmailConfirmationTemplate = ({ confirmationLink }) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email address - InSocial</title>
    <style>
        /* Reset styles */
        body, p, h1, div {
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #f8fafc;
            font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
        }

        /* Container styles */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Header styles */
        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .icon-circle {
            width: 64px;
            height: 64px;
            margin: 0 auto 24px;
            background-color: #6366f1;
            border-radius: 50%;
            text-align: center;
            line-height: 64px;
        }

        .icon-circle img {
            vertical-align: middle;
            margin-top: 16px;
        }

        .title {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 16px;
            line-height: 1.2;
        }

        .subtitle {
            font-size: 16px;
            color: #64748b;
            margin: 0;
            line-height: 1.6;
        }

        /* Button styles */
        .button {
            display: inline-block;
            padding: 16px 32px;
            background-color: #6366f1;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            margin: 24px 0;
        }

        /* Link box styles */
        .link-box {
            margin: 32px 0;
            padding: 16px;
            background-color: #f1f5f9;
            border-radius: 8px;
            font-size: 14px;
            color: #64748b;
        }

        .code-block {
            display: block;
            word-break: break-all;
            padding: 12px;
            background-color: #ffffff;
            border-radius: 6px;
            color: #6366f1;
            font-size: 13px;
            border: 1px solid #e2e8f0;
            margin-top: 8px;
            font-family: monospace;
        }

        /* Timer section */
        .timer {
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
            margin-top: 24px;
        }

        /* Warning box styles */
        .warning-box {
            background-color: #fef2f2;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            color: #991b1b;
            font-size: 14px;
            line-height: 1.5;
        }

        /* Footer styles */
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 24px;
            margin-top: 32px;
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
        }

        .footer a {
            color: #6366f1;
            text-decoration: none;
        }

        .copyright {
            margin-top: 8px;
            font-size: 12px;
        }

        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            body {
                padding: 20px 10px;
            }
            
            .container {
                padding: 30px 20px;
            }

            .title {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <div class="icon-circle">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'%3E%3C/path%3E%3Cpolyline points='22,6 12,13 2,6'%3E%3C/polyline%3E%3C/svg%3E" alt="Email Icon" width="32" height="32">
            </div>
            <h1 class="title">Verify your email address</h1>
            <p class="subtitle">Thanks for joining InSocial! Let's verify your email to get started.</p>
        </div>

        <!-- Main Content -->
        <div style="text-align: center;">
            <a href="${confirmationLink}" class="button">
                Verify Email Address
            </a>

            <div class="link-box">
                <p style="margin: 0 0 8px; font-weight: 500;">Or copy this link:</p>
                <code class="code-block">${confirmationLink}</code>
            </div>

            <div class="timer">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E" alt="Clock Icon" style="vertical-align: middle; margin-right: 4px;">
                <span>This link will expire in 24 hours</span>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="warning-box">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E" alt="Warning Icon" style="vertical-align: top; margin-right: 8px;">
                If you didn't create an account with InSocial, please ignore this email or contact our support team.
            </div>

            <p style="margin: 0 0 8px;">
                Need help? Contact us at <a href="mailto:support@insocial.tech">support@insocial.tech</a>
            </p>
            <p class="copyright">
                © 2024 InSocial. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
};

export default EmailConfirmationTemplate;
