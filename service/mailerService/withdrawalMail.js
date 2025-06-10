const { sendEmail } = require("../../lib/smtp");

const fundraiseWithdrawalMail = async (data) => {
    const { email, name, date, amount, signature, method = "Crypto", currency = "USDC", walletAddress, link } = data;

    const subject = `Fundraise withdrawal of ${amount.toLocaleString()} sent`;

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
            <img src="https://www.emergfunds.org/logo-red.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 24px;">Withdrawal Confirmation</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Hello ${name},</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">We're writing to confirm that your withdrawal request from your fundraiser <strong>"[Fundraise Title]"</strong> has been processed successfully.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #F5ECD9; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <div style="color: #C01A27; font-size: 40px;">✓</div>
                </div>
                <p style="margin-top: 15px; font-weight: bold; color: #0F1A2C; font-size: 18px;">Funds are on the way!</p>
            </div>
            
            <!-- Withdrawal Details Box -->
            <div style="background-color: #F5ECD9; padding: 20px; border-radius: 5px; margin: 25px 0; border-left: 4px solid #C01A27;">
                <h2 style="color: #C01A27; margin-bottom: 15px; font-size: 20px;">Withdrawal Details</h2>
                
                <table class="withdrawal-table" width="100%" cellspacing="0" cellpadding="5" border="0" style="font-size: 14px;">
                    <tr>
                        <td width="40%" style="color: #0F1A2C;"><strong>Amount:</strong></td>
                        <td width="60%" style="color: #0F1A2C;">$${amount.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Signature:</strong></td>
                        <td style="color: #0F1A2C;">${signature}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Date Requested:</strong></td>
                        <td style="color: #0F1A2C;">${date}</td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Date Processed:</strong></td>
                        <td style="color: #0F1A2C;">${date}</td>
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
                </table>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">The funds have been sent to your designated wallet address and should arrive within <strong>5-20 seconds</strong>, depending on your wallet application.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href=${link} class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">View Transaction on BlockChain</a>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">If you have any questions about this withdrawal or need further assistance, please contact our support team at <a href="mailto:support@emergfunds.org" style="color: #C01A27; text-decoration: none;">support@emergfunds.com</a>.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Thank you for using EMERG FUNDS for your emergency fundraising needs.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C;">Best regards,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Reminder Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 18px; margin-bottom: 10px;">Important Reminder</h2>
            <p style="color: #0F1A2C;">Please keep your supporters updated on how the funds are being used. Transparency builds trust and encourages continued support for your cause.</p>
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
module.exports = fundraiseWithdrawalMail;
