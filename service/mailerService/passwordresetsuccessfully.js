const { sendEmail } = require("../../lib/smtp");

const passwordChangedConfirmationMail = async (data) => {
  const { email, name, date, device, location } = data;

  const subject = "Password Reset Successful";

  const html = `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
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
            .button {
                width: 100% !important;
                text-align: center !important;
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
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 24px;">Password Reset Successful</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Hello, ${name}</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #F5ECD9; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <div style="color: #C01A27; font-size: 40px;">✓</div>
                </div>
                <p style="margin-top: 15px; font-weight: bold; color: #0F1A2C; font-size: 18px;">Your password has been successfully reset!</p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Your EMERG FUNDS account password has been successfully changed. You can now log in with your new password.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">If you did not make this change, please contact our support team immediately at <a href="mailto:support@emergfunds.com" style="color: #C01A27; text-decoration: none;">support@emergfunds.com</a> or call us at <a href="tel:+18001234567" style="color: #C01A27; text-decoration: none;">1-800-123-4567</a>.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Log In to Your Account</a>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Thank you,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Security Tips Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 18px; margin-bottom: 10px;">Security Tips</h2>
            <ul style="padding-left: 20px; color: #0F1A2C;">
                <li style="margin-bottom: 5px;">Never share your password with anyone.</li>
                <li style="margin-bottom: 5px;">Use a unique password for your EMERG FUNDS account.</li>
                <li style="margin-bottom: 5px;">Enable two-factor authentication for added security.</li>
                <li style="margin-bottom: 5px;">Regularly check your account for any suspicious activity.</li>
            </ul>
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

  await sendEmail(email, subject, html);
};
module.exports = passwordChangedConfirmationMail;
