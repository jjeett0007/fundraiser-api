const { sendEmail } = require("../../lib/smtp");

const sendVerificationEmail = async (data) => {
  const to = data.email;
  const verificationCode = data.code;
  const subject = "Email Verification";
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style type="text/css">
        /* Reset styles */
        body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #0F1A2C;
            background-color: #F5ECD9;
        }
        /* Responsive container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #FFFFFF;
        }
        /* Media query for mobile devices */
        @media only screen and (max-width: 480px) {
            .container {
                width: 100% !important;
                padding: 10px !important;
            }
            .logo {
                width: 80% !important;
                height: auto !important;
            }
            .otp-code {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #0F1A2C; background-color: #F5ECD9;">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20Assests-13-ERzVmtXuMyicTu1JpkN2vo7h8BEIzU.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 24px;">Your One-Time Password</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Hello,</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">You've requested a one-time password (OTP) for your EMERG FUNDS account. Please use the code below to complete your verification:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <div class="otp-code" style="font-size: 32px; font-weight: bold; letter-spacing: 5px; padding: 15px; background-color: #F5ECD9; border-radius: 5px; display: inline-block; color: #C01A27;">${verificationCode}</div>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">This code will expire in <strong>10 minutes</strong>. If you did not request this code, please ignore this email or contact our support team immediately.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Thank you,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E9B96E; text-align: center; font-size: 12px; color: #0F1A2C;">
            <p style="margin-bottom: 10px;">© 2025 EMERG FUNDS. All rights reserved.</p>
            <p style="margin-bottom: 10px;">This is an automated message, please do not reply to this email.</p>
            <p>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px;">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>
        `;
  await sendEmail(to, subject, html);
};

module.exports = sendVerificationEmail;
