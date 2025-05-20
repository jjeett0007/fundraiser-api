const { sendEmail } = require("../../lib/smtp");

const donationUserMail = async (data) => {
    const { email, name, date, amount, signature, method = "Crypto", currency = "USDC", walletAddress, title, link } = data;

    const subject = "Thank you for your Donation!";

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Withdrawal Confirmation</title>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet">
        <style type="text/css">
            body, p, h1, h2, h3, h4, h5, h6, td, a {
                margin: 0;
                padding: 0;
                font-family: 'Baloo 2', cursive;
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

    <body style="margin: 0; padding: 0; font-family: 'Baloo 2', cursive; line-height: 1.6; background-color: #F5ECD9;">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20Assests-13-ERzVmtXuMyicTu1JpkN2vo7h8BEIzU.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 24px;">Thank You for Your Donation!</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Hello ${name},</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Thank you for your generous donation to <strong>"${title}"</strong>. Your support makes a real difference in times of emergency.</p>
            
            <!-- Donation Receipt Box -->
            <div style="background-color: #F5ECD9; padding: 20px; border-radius: 5px; margin: 25px 0; border-left: 4px solid #C01A27;">
                <h2 style="color: #C01A27; margin-bottom: 15px; font-size: 20px;">Donation Receipt</h2>
                
                <table class="receipt-table" width="100%" cellspacing="0" cellpadding="5" border="0" style="font-size: 14px;">
                    <tr>
                        <td width="40%" style="color: #0F1A2C;"><strong>Donation Amount:</strong></td>
                        <td width="60%" style="color: #0F1A2C;">$${amount.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Date:</strong></td>
                        <td style="color: #0F1A2C;">${date}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Signature:</strong></td>
                        <td style="color: #0F1A2C;">${signature}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Payment Method:</strong></td>
                        <td style="color: #0F1A2C;">${method}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Cuurency:</strong></td>
                        <td style="color: #0F1A2C;">${currency}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Account:</strong></td>
                        <td style="color: #0F1A2C;">${walletAddress}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Campaign:</strong></td>
                        <td style="color: #0F1A2C;">${title}</td>
                    </tr>
                   
                </table>
                
                <p style="margin-top: 15px; font-size: 12px; color: #0F1A2C;">This receipt is for your records. Please save or print for tax purposes.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #F5ECD9; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <div style="color: #C01A27; font-size: 40px; margin: auto;">❤️</div>
                </div>
                <p style="margin-top: 15px; font-weight: bold; color: #0F1A2C; font-size: 18px;">Your generosity helps save lives!</p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Your contribution will help [Organizer Name] reach their fundraising goal and provide much-needed support during this emergency situation.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">View Donation on Blockchain</a>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Want to make an even bigger impact? Share this campaign with your friends and family:</p>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-weight: bold;">
                    <span style="margin-right: 5px;">📱</span> Share
                </a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-weight: bold;">
                    <span style="margin-right: 5px;">📘</span> Facebook
                </a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-weight: bold;">
                    <span style="margin-right: 5px;">🐦</span> Twitter
                </a>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Thank you again for your kindness and generosity.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">With gratitude,<br>The EMERG FUNDS Team</p>
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
module.exports = donationUserMail;
