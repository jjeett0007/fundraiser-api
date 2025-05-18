const { sendEmail } = require("../../lib/smtp");

const welcomeMessage = async (data) => {
  const { email, name, date, device, location } = data;

  const subject = "Password Reset Successful";

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to EMERG FUNDS</title>
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
            .feature-box {
                width: 100% !important;
                display: block !important;
                margin-bottom: 15px !important;
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
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 24px;">Welcome to EMERG FUNDS!</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Hello [User Name],</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Thank you for joining EMERG FUNDS, the platform dedicated to emergency fundraising when it matters most. Your account has been successfully created, and you're now part of a community that helps people during critical times.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Complete Your Profile</a>
            </div>
            
            <h2 style="color: #0F1A2C; margin: 25px 0 15px; font-size: 20px;">What You Can Do Now:</h2>
            
            <!-- Feature Boxes -->
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td class="feature-box" width="33%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 150px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">🔍</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 16px;">Explore Campaigns</h3>
                            <p style="font-size: 14px; color: #0F1A2C;">Discover emergency fundraisers that need your support.</p>
                        </div>
                    </td>
                    <td class="feature-box" width="33%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 150px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">📣</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 16px;">Start a Fundraiser</h3>
                            <p style="font-size: 14px; color: #0F1A2C;">Create your own emergency fundraising campaign.</p>
                        </div>
                    </td>
                    <td class="feature-box" width="33%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 150px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">❤️</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 16px;">Make a Difference</h3>
                            <p style="font-size: 14px; color: #0F1A2C;">Donate to causes that matter to you and your community.</p>
                        </div>
                    </td>
                </tr>
            </table>
            
            <p style="margin: 25px 0 20px; color: #0F1A2C;">At EMERG FUNDS, we believe in the power of community to provide rapid financial support during emergencies. Our platform is designed to make fundraising simple, secure, and effective.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">If you have any questions or need assistance, our support team is here to help. Simply reply to this email or contact us at <a href="mailto:support@emergfunds.com" style="color: #C01A27; text-decoration: none;">support@emergfunds.com</a>.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">We're excited to have you with us!</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Warm regards,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Quick Links Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 18px; margin-bottom: 10px;">Quick Links</h2>
            <ul style="padding-left: 20px; color: #0F1A2C;">
                <li style="margin-bottom: 8px;"><a href="#" style="color: #C01A27; text-decoration: none;">How EMERG FUNDS Works</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: #C01A27; text-decoration: none;">Success Stories</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: #C01A27; text-decoration: none;">Fundraising Tips</a></li>
                <li style="margin-bottom: 0;"><a href="#" style="color: #C01A27; text-decoration: none;">Safety & Security</a></li>
            </ul>
        </div>
        
        <!-- Social Media -->
        <div style="margin-top: 20px; text-align: center;">
            <p style="margin-bottom: 10px; color: #0F1A2C; font-weight: bold;">Follow Us</p>
            <div>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;">📱</a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;">📘</a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;">📸</a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;">🐦</a>
            </div>
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
module.exports = welcomeMessage;
