const { sendEmail } = require("../../lib/smtp");

const withDrawalFailed = async (data) => {
  const { email, name, date, title, requestBalance, availableBalance, id } = data;

  const subject = "Campaign Withdrawal Request Failed - Insufficient Funds";

  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Failed - Insufficient Funds</title>
    <!-- Google Fonts - Times New Roman -->
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style type="text/css">
        /* Reset styles */
        body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Times New Roman', cursive, Arial, sans-serif;
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
            .withdrawal-table {
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Times New Roman', cursive, Arial, sans-serif; line-height: 1.6; color: #0F1A2C; background-color: #F5ECD9;">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://www.emergfunds.org/logo-red.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 28px; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 700;">Withdrawal Request Failed</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 16px;">Hello ${name},</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 16px;">We're writing to inform you that your recent withdrawal request from your fundraiser <strong>[${title}]</strong> could not be processed due to insufficient available funds.</p>
            
            <!-- Status Box -->
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0; text-align: center;">
                <div style="display: inline-block; background-color: #C01A27; color: #FFFFFF; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 16px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
                    WITHDRAWAL FAILED
                </div>
                <p style="margin-top: 10px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif;">Reason: Insufficient Available Funds</p>
            </div>
            
            <!-- Withdrawal Details Box -->
            <div style="background-color: #F5ECD9; padding: 20px; border-radius: 5px; margin: 25px 0; border-left: 4px solid #C01A27;">
                <h2 style="color: #C01A27; margin-bottom: 15px; font-size: 20px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">Withdrawal Request Details</h2>
                
                <table class="withdrawal-table" width="100%" cellspacing="0" cellpadding="5" border="0" style="font-size: 15px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
                    <tr>
                        <td width="40%" style="color: #0F1A2C;"><strong>Requested Amount:</strong></td>
                        <td width="60%" style="color: #0F1A2C;">$${requestBalance.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Available Balance:</strong></td>
                        <td style="color: #0F1A2C;">$${availableBalance.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Request Date:</strong></td>
                        <td style="color: #0F1A2C;">${date}</td>
                    </tr>

                    <tr>
                        <td style="color: #0F1A2C;"><strong>Campaign:</strong></td>
                        <td style="color: #0F1A2C;">${title}</td>
                    </tr>
                </table>
            </div>
            
            <h2 style="color: #0F1A2C; margin: 25px 0 15px; font-size: 22px; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 600;">Why This Happened:</h2>
            
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0;">
                <ul style="padding-left: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 15px; margin: 0;">
                    <li style="margin-bottom: 8px;">Your withdrawal request exceeded your available campaign balance</li>
                    <li style="margin-bottom: 8px;">Some funds may still be processing from recent donations</li>
                    <li style="margin-bottom: 8px;">Platform fees may have been deducted from your total raised amount</li>
                    <li style="margin-bottom: 0;">Previous withdrawals may have reduced your available balance</li>
                </ul>
            </div>
            
            <h2 style="color: #0F1A2C; margin: 25px 0 15px; font-size: 22px; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 600;">What You Can Do:</h2>
            
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0;">
                <ol style="padding-left: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 15px; margin: 0;">
                    <li style="margin-bottom: 8px;"><strong>Check your campaign dashboard</strong> to see your current available balance</li>
                    <li style="margin-bottom: 8px;"><strong>Wait for pending donations</strong> to clear (usually 3-5 business days)</li>
                    <li style="margin-bottom: 8px;"><strong>Submit a new withdrawal request</strong> for an amount within your available balance</li>
                    <li style="margin-bottom: 0;"><strong>Contact our support team</strong> if you believe this is an error</li>
                </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.emergfunds.org/fundraiser/${id}" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 18px;">View Campaign Dashboard</a>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-weight: bold; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
                    <span style="margin-right: 5px;">💰</span> Make New Withdrawal Request
                </a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-weight: bold; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
                    <span style="margin-right: 5px;">📊</span> View Transaction History
                </a>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 16px;">If you have any questions about your available balance, withdrawal process, or believe this failure was made in error, please don't hesitate to contact our support team.</p>
            
            <!-- Contact Support Section -->
            <div style="background-color: #F5ECD9; padding: 20px; border-radius: 5px; margin: 25px 0; text-align: center;">
                <h3 style="color: #C01A27; margin-bottom: 15px; font-size: 20px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">Need Help? Contact Our Support Team</h3>
                
                <div style="margin: 15px 0;">
                    <a href="mailto:support@emergfunds.com" style="display: inline-block; background-color: #C01A27; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 5px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
                        <span style="margin-right: 5px;">✉️</span> Email Support
                    </a>
                    <a href="tel:+18001234567" style="display: inline-block; background-color: #0F1A2C; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 5px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
                        <span style="margin-right: 5px;">📞</span> Call Us
                    </a>
                </div>
                
                <p style="color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 14px; margin-top: 10px;">
                    <strong>Email:</strong> support@emergfunds.org<br>
                    <strong>Phone:</strong> 1-800-123-4567<br>
                    <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                </p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 16px;">We apologize for any inconvenience this may have caused. Our team is here to help resolve any issues and ensure you can access your funds as quickly as possible.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 16px;">Thank you for your understanding.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 16px;">Best regards,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- FAQ Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 20px; margin-bottom: 10px; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 600;">Frequently Asked Questions</h2>
            <div style="margin-bottom: 15px;">
                <p style="margin-bottom: 5px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 600;">Q: When will my recent donations become available for withdrawal?</p>
                <p style="color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 15px;">A: Donations typically become available for withdrawal instantly after they are received.</p>
            </div>
            <div style="margin-bottom: 15px;">
                <p style="margin-bottom: 5px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 600;">Q: Are there any fees deducted from my fundraiser?</p>
                <p style="color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 15px;">A: Yes, platform and payment processing fees are deducted. Check your dashboard for detailed fee information.</p>
            </div>
            <div>
                <p style="margin-bottom: 5px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-weight: 600;">Q: Can I withdraw partial amounts?</p>
                <p style="color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif; font-size: 15px;">A: No, you can only withdraw the total fundraise at any time.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E9B96E; text-align: center; font-size: 14px; color: #0F1A2C; font-family: 'Times New Roman', cursive, Arial, sans-serif;">
            <p style="margin-bottom: 10px;">© 2025 EMERG FUNDS. All rights reserved.</p>
            <p style="margin-bottom: 10px;">This is an automated message, please do not reply to this email.</p>
            <p>
                <a href="https://www.emergfunds.org/about" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">About</a>
                <a href="https://www.emergfunds.org/" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">Terms of Service</a>
                <a href="https://www.emergfunds.org/" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', cursive, Arial, sans-serif;">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;

  await sendEmail(email, subject, html);
};

module.exports = withDrawalFailed;
