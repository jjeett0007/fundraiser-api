const { sendEmail } = require("../../lib/smtp");

const donationCreatorNotify = async (data) => {
    const { email, name, date, percentage, currentAmount, message, goalAmount, amount, title, donorName } = data;

    const subject = `You've Received a Donation of ${amount.toLocaleString()} - ${title}`;

    const html = `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>New Donation</title>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet">
        <style type="text/css">
            body, p, h1, h2, h3, h4, h5, h6, td, a {
                margin: 0;
                padding: 0;
                font-family: 'Times New Roman', cursive;
                color: #0F1A2C;
            }

            body {
                line-height: 1.6;
                background-color: #F5ECD9;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #FFFFFF;
            }

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

    <body style="margin: 0; padding: 0; font-family: 'Times New Roman', cursive; line-height: 1.6; background-color: #F5ECD9;">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://www.emergfunds.org/logo-red.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 24px;">You've Received a Donation!</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Hello ${name},</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Great news! Your fundraiser <strong>"${title}"</strong> has received a new donation.</p>
            
            <!-- Donation Details Box -->
            <div style="background-color: #F5ECD9; padding: 20px; border-radius: 5px; margin: 25px 0; border-left: 4px solid #C01A27;">
                <table width="100%" cellspacing="0" cellpadding="5" border="0" style="font-size: 14px;">
                    <tr>
                        <td width="40%" style="color: #0F1A2C;"><strong>Donor:</strong></td>
                        <td width="60%" style="color: #0F1A2C;">${donorName}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Amount:</strong></td>
                        <td style="color: #0F1A2C; font-weight: bold;">$${amount.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Date:</strong></td>
                        <td style="color: #0F1A2C;">${date}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Message:</strong></td>
                        <td style="color: #0F1A2C; font-style: italic;">"${message}"</td>
                    </tr>
                </table>
            </div>
            
            <!-- Progress Bar -->
            <div style="margin: 30px 0;">
                <p style="margin-bottom: 10px; color: #0F1A2C;"><strong>Campaign Progress:</strong> $${Number(currentAmount).toLocaleString()} of $${Number(goalAmount).toLocaleString()} raised</p>
                <div class="progress-bar-container" style="background-color: #F5ECD9; height: 20px; border-radius: 10px; overflow: hidden; width: 100%;">
                    <div style="background-color: #C01A27; height: 100%; width: ${(Number(percentage).toPrecision(2))}%;"></div>
                </div>
                <p style="margin-top: 5px; font-size: 14px; color: #0F1A2C; text-align: right;">${Number(percentage).toPrecision(2)}% Complete</p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Don't forget to thank your donor! A personal thank you message can encourage future donations and build stronger connections with your supporters.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Thank Your Donor</a>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-weight: bold;">
                    <span style="margin-right: 5px;">📊</span> View Campaign Dashboard
                </a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-weight: bold;">
                    <span style="margin-right: 5px;">📝</span> Post an Update
                </a>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Keep up the great work! Regular updates about how the funds are being used can help maintain momentum and encourage more donations.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Best regards,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Tips Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 18px; margin-bottom: 10px;">Quick Tip</h2>
            <p style="color: #0F1A2C;">Campaigns that post regular updates raise up to 3x more than those that don't. Share how the donations are making an impact to keep your supporters engaged!</p>
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
module.exports = donationCreatorNotify;
