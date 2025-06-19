const { sendEmail } = require("../../lib/smtp");

const fundRaiseCreated = async (data) => {
    const { email, name, date, title } = data;

    const subject = "New Fundraise Campaign Created";

    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Fundraising Campaign Has Been Created</title>
    <!-- Google Fonts - Times New Roman -->
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style type="text/css">
        /* Reset styles */
        body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Times New Roman', Arial, sans-serif;
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

        .align-text {
            display: flex;
            align-items: center;
            justify-ceontent: center;
            padding: auto;
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
            .step-box {
                width: 100% !important;
                display: block !important;
                margin-bottom: 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Times New Roman', Arial, sans-serif; line-height: 1.6; color: #0F1A2C; background-color: #F5ECD9;">
    <div class="container" style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://www.emergfunds.org/logo-red.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 28px; font-family: 'Times New Roman', Arial, sans-serif; font-weight: 700;">Your Campaign is Created!</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">Hello ${name},</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">Great job! You've taken the first step by creating your fundraising campaign <strong>"[${title}]"</strong>. Your campaign is currently saved as a draft and is not yet visible to the public.</p>
            
            <!-- Status Box -->
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0; text-align: center;">
                <div style="display: inline-block; background-color: #E9B96E; color: #0F1A2C; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 16px; font-family: 'Times New Roman', Arial, sans-serif;">
                    DRAFT - NOT LAUNCHED
                </div>
                <p style="margin-top: 10px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif;">Created on: ${date}</p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">Your campaign is saved and ready for you to complete and launch whenever you're ready. Take your time to make it perfect before submitting it for review.</p>
            
            <h2 style="color: #0F1A2C; margin: 25px 0 15px; font-size: 22px; font-family: 'Times New Roman', Arial, sans-serif; font-weight: 600;">Complete These Steps to Launch Your Campaign:</h2>
            
<!-- Steps -->
<table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td class="step-box" width="25%" valign="top" style="padding: 10px;">
            <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                <div class="align-text" style="background-color: #C01A27; display: flex; align-items: center; justify-content: center; color: #FFFFFF; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-family: 'Times New Roman', Arial, sans-serif; font-size: 20px;">
                <p style="margin: auto">1</p>
                </div>
                <h3 style="color: #0F1A2C; margin-bottom: 5px; font-size: 18px; font-family: 'Times New Roman', Arial, sans-serif;">Verify Your Identity</h3>
                <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif;">Complete identity verification to ensure campaign security.</p>
            </div>
        </td>
        <td class="step-box" width="25%" valign="top" style="padding: 10px;">
            <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                <div class="align-text" style="background-color: #C01A27; display: flex; align-items: center; justify-content: center; color: #FFFFFF; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-family: 'Times New Roman', Arial, sans-serif; font-size: 20px;">
                <p style="margin: auto">2</p>
                </div>
                <h3 style="color: #0F1A2C; margin-bottom: 5px; font-size: 18px; font-family: 'Times New Roman', Arial, sans-serif;">Upload Proof</h3>
                <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif;">Provide documentation to support your fundraising need.</p>
            </div>
        </td>
       
    </tr>

    <tr>
        <td class="step-box" width="25%" valign="top" style="padding: 10px;">
            <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                <div class="align-text" style="background-color: #C01A27; color: #FFFFFF; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-family: 'Times New Roman', Arial, sans-serif; font-size: 20px;">
                <p style="margin: auto">3</p>
                </div>
                <h3 style="color: #0F1A2C; margin-bottom: 5px; font-size: 18px; font-family: 'Times New Roman', Arial, sans-serif;">Submit Verification</h3>
                <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif;">Submit your campaign for our team to review and verify.</p>
            </div>
        </td>
        <td class="step-box" width="25%" valign="top" style="padding: 10px;">
            <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                <div class="align-text" style="background-color: #C01A27; color: #FFFFFF; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-family: 'Times New Roman', Arial, sans-serif; font-size: 20px;">
                <p style="margin: auto">4</p>
                </div>
                <h3 style="color: #0F1A2C; margin-bottom: 5px; font-size: 18px; font-family: 'Times New Roman', Arial, sans-serif;">Wait for Approval</h3>
                <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif;">Our team will review your submission within 24-48 hours.</p>
            </div>
        </td>
    </tr>
</table>

<div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0; text-align: center;">
    <p style="color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px; font-weight: 600;">
        Once your campaign is verified, you'll be able to launch it and start accepting donations!
    </p>
</div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-family: 'Times New Roman', Arial, sans-serif; font-size: 18px;">Begin Verification Process</a>
            </div>
            
            <p style="margin: 25px 0 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">Remember, your campaign will remain as a draft until it's verified and you launch it. Verification helps ensure all fundraisers on our platform are legitimate and builds trust with potential donors.</p>
            
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0;">
                <h3 style="color: #C01A27; margin-bottom: 10px; font-size: 18px; font-family: 'Times New Roman', Arial, sans-serif;">Did You Know?</h3>
                <p style="color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 15px;">Campaigns that are completed within 3 days of creation are 50% more likely to reach their fundraising goals. Don't leave your draft sitting too long!</p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">If you have any questions or need assistance completing your campaign, our support team is here to help. Contact us at <a href="mailto:support@emergfunds.com" style="color: #C01A27; text-decoration: none; font-family: 'Times New Roman', Arial, sans-serif;">support@emergfunds.com</a>.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">We're looking forward to helping you raise the funds you need!</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 16px;">Best regards,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Tips Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 20px; margin-bottom: 10px; font-family: 'Times New Roman', Arial, sans-serif; font-weight: 600;">Tips for a Successful Campaign</h2>
            <ul style="padding-left: 20px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif; font-size: 15px;">
                <li style="margin-bottom: 8px;">Be specific about your emergency situation and how the funds will help.</li>
                <li style="margin-bottom: 8px;">Add a clear, high-quality photo that shows the situation.</li>
                <li style="margin-bottom: 8px;">Set a realistic fundraising goal based on your actual needs.</li>
                <li style="margin-bottom: 0;">Plan how you'll share your campaign once it's live.</li>
            </ul>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E9B96E; text-align: center; font-size: 14px; color: #0F1A2C; font-family: 'Times New Roman', Arial, sans-serif;">
            <p style="margin-bottom: 10px;">© 2025 EMERG FUNDS. All rights reserved.</p>
            <p style="margin-bottom: 10px;">This is an automated message, please do not reply to this email.</p>
            <p>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', Arial, sans-serif;">Privacy Policy</a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', Arial, sans-serif;">Terms of Service</a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', Arial, sans-serif;">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>

    `;

    await sendEmail(email, subject, html);
};
module.exports = fundRaiseCreated;
