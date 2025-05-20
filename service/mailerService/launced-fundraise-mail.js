const { sendEmail } = require("../../lib/smtp");

const fundraiseLive = async (data) => {
    const { email, name, date, title, fundraiseId, goalAmount } = data;

    const subject = "Fundraising Campaign Is Now Live!";

    const html = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Fundraising Campaign Is Now Live!</title>
    <!-- Google Fonts - Baloo 2 -->
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style type="text/css">
        /* Reset styles */
        body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Baloo 2', Arial, sans-serif;
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
            .share-button {
                display: block !important;
                width: 100% !important;
                margin: 10px 0 !important;
            }
            .action-box {
                width: 100% !important;
                display: block !important;
                margin-bottom: 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Baloo 2', Arial, sans-serif; line-height: 1.6; color: #0F1A2C; background-color: #F5ECD9;">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20Assests-13-ERzVmtXuMyicTu1JpkN2vo7h8BEIzU.png" alt="EMERG FUNDS Logo" class="logo" style="max-width: 250px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 20px; background-color: #FFFFFF; border-radius: 5px; border-top: 4px solid #C01A27;">
            <h1 style="color: #0F1A2C; margin-bottom: 20px; font-size: 28px; font-family: 'Baloo 2', Arial, sans-serif; font-weight: 700;">Your Campaign Is Now Live! 🎉</h1>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">Hello ${name},</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">Congratulations! Your fundraising campaign <strong>"${title}"</strong> is now officially live and ready to accept donations. This is an exciting moment – your campaign is now visible to the world!</p>
            
            <!-- Status Box -->
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0; text-align: center;">
                <div style="display: inline-block; background-color: #C01A27; color: #FFFFFF; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 16px; font-family: 'Baloo 2', Arial, sans-serif;">
                    CAMPAIGN LIVE
                </div>
                <p style="margin-top: 10px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif;">Launched on: ${date}</p>
            </div>
            
            <!-- Campaign Details -->
            <div style="background-color: #F5ECD9; padding: 20px; border-radius: 5px; margin: 25px 0; border-left: 4px solid #C01A27;">
                <h2 style="color: #C01A27; margin-bottom: 15px; font-size: 20px; font-family: 'Baloo 2', Arial, sans-serif;">Campaign Details</h2>
                
                <table width="100%" cellspacing="0" cellpadding="5" border="0" style="font-size: 15px; font-family: 'Baloo 2', Arial, sans-serif;">
                    <tr>
                        <td width="40%" style="color: #0F1A2C;"><strong>Campaign URL:</strong></td>
                        <td width="60%" style="color: #0F1A2C;"><a href="https://www.emergfunds.org/fundraiser/${fundraiseId}" style="color: #C01A27; text-decoration: none; word-break: break-all;">https://www.emergfunds.org/fundraiser/${fundraiseId}</a></td>
                    </tr>
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Fundraising Goal:</strong></td>
                        <td style="color: #0F1A2C;">$${goalAmount.toLocaleString()}</td>
                    </tr>
                    
                    <tr>
                        <td style="color: #0F1A2C;"><strong>Start Date:</strong></td>
                        <td style="color: #0F1A2C;">${date}</td>
                    </tr>
                </table>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">The first 24-48 hours are critical for your campaign's success. Now is the time to spread the word and start collecting donations!</p>
            
            <h2 style="color: #0F1A2C; margin: 25px 0 15px; font-size: 22px; font-family: 'Baloo 2', Arial, sans-serif; font-weight: 600;">Your Next Steps:</h2>
            
            <!-- Action Boxes -->
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td class="action-box" width="50%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">📱</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 18px; font-family: 'Baloo 2', Arial, sans-serif;">Share on Social Media</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif;">Share your campaign on all your social platforms to reach more potential donors.</p>
                        </div>
                    </td>
                    <td class="action-box" width="50%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">✉️</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 18px; font-family: 'Baloo 2', Arial, sans-serif;">Email Your Network</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif;">Send personal emails to friends, family, and colleagues asking for their support.</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="action-box" width="50%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">📝</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 18px; font-family: 'Baloo 2', Arial, sans-serif;">Post Your First Update</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif;">Add a campaign update to keep supporters engaged and show your commitment.</p>
                        </div>
                    </td>
                    <td class="action-box" width="50%" valign="top" style="padding: 10px;">
                        <div style="text-align: center; background-color: #F5ECD9; padding: 15px; border-radius: 5px; height: 160px;">
                            <div style="font-size: 30px; margin-bottom: 10px;">🙏</div>
                            <h3 style="color: #C01A27; margin-bottom: 5px; font-size: 18px; font-family: 'Baloo 2', Arial, sans-serif;">Thank Your First Donors</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif;">Send personal thank-you messages to your early supporters to build momentum.</p>
                        </div>
                    </td>
                </tr>
            </table>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="button" style="background-color: #C01A27; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-family: 'Baloo 2', Arial, sans-serif; font-size: 18px;">View Your Campaign</a>
            </div>
            
            <h2 style="color: #0F1A2C; margin: 25px 0 15px; font-size: 22px; font-family: 'Baloo 2', Arial, sans-serif; font-weight: 600;">Share Your Campaign:</h2>
            
            <!-- Share Buttons -->
            <div style="text-align: center; margin: 20px 0;">
                <a href="#" class="share-button" style="display: inline-block; background-color: #3b5998; color: #FFFFFF; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 0 5px; font-family: 'Baloo 2', Arial, sans-serif;">
                    <span style="margin-right: 5px;">📘</span> Facebook
                </a>
                <a href="#" class="share-button" style="display: inline-block; background-color: #1DA1F2; color: #FFFFFF; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 0 5px; font-family: 'Baloo 2', Arial, sans-serif;">
                    <span style="margin-right: 5px;">🐦</span> Twitter
                </a>
                <a href="#" class="share-button" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 0 5px; font-family: 'Baloo 2', Arial, sans-serif;">
                    <span style="margin-right: 5px;">💬</span> WhatsApp
                </a>
                <a href="#" class="share-button" style="display: inline-block; background-color: #0077B5; color: #FFFFFF; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 0 5px; font-family: 'Baloo 2', Arial, sans-serif;">
                    <span style="margin-right: 5px;">💼</span> LinkedIn
                </a>
            </div>
            
            <!-- Copy Link Box -->
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0;">
                <p style="margin-bottom: 10px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 15px;"><strong>Share this link with your network:</strong></p>
                <div style="background-color: #FFFFFF; padding: 12px; border: 1px solid #E9B96E; border-radius: 4px; font-family: 'Baloo 2', Arial, sans-serif; word-break: break-all; color: #0F1A2C; font-size: 14px;">
                    https://www.emergfunds.org/fundraiser/${fundraiseId}
                </div>
                <p style="margin-top: 10px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 14px; font-style: italic;">Select and copy this link to share your campaign via text message, messaging apps, or email.</p>
            </div>
            
            <div style="background-color: #F5ECD9; padding: 15px; border-radius: 5px; margin: 25px 0;">
                <h3 style="color: #C01A27; margin-bottom: 10px; font-size: 18px; font-family: 'Baloo 2', Arial, sans-serif;">Did You Know?</h3>
                <p style="color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 15px;">Campaigns that raise 30% of their goal within the first week are more likely to reach or exceed their total fundraising goal. The momentum you build now is crucial!</p>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">Remember to check your campaign dashboard regularly to track donations, thank donors, and post updates about your progress.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">If you have any questions or need assistance with your campaign, our support team is here to help. Contact us at <a href="mailto:support@emergfunds.com" style="color: #C01A27; text-decoration: none; font-family: 'Baloo 2', Arial, sans-serif;">support@emergfunds.org</a>.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">We're excited to see your campaign succeed!</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 16px;">Best regards,<br>The EMERG FUNDS Team</p>
        </div>
        
        <!-- Tips Section -->
        <div style="margin-top: 20px; padding: 15px; background-color: #F5ECD9; border-radius: 5px;">
            <h2 style="color: #0F1A2C; font-size: 20px; margin-bottom: 10px; font-family: 'Baloo 2', Arial, sans-serif; font-weight: 600;">Tips for Campaign Success</h2>
            <ul style="padding-left: 20px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif; font-size: 15px;">
                <li style="margin-bottom: 8px;">Personally ask at least 5-10 close contacts to donate in the first 24 hours.</li>
                <li style="margin-bottom: 8px;">Post updates at least once a week to keep supporters engaged.</li>
                <li style="margin-bottom: 8px;">Share your campaign on different platforms at different times of day.</li>
                <li style="margin-bottom: 8px;">Use compelling visuals when sharing on social media.</li>
                <li style="margin-bottom: 0;">Always thank your donors promptly and personally.</li>
            </ul>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E9B96E; text-align: center; font-size: 14px; color: #0F1A2C; font-family: 'Baloo 2', Arial, sans-serif;">
            <p style="margin-bottom: 10px;">© 2025 EMERG FUNDS. All rights reserved.</p>
            <p style="margin-bottom: 10px;">This is an automated message, please do not reply to this email.</p>
            <p>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Baloo 2', Arial, sans-serif;">Privacy Policy</a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Baloo 2', Arial, sans-serif;">Terms of Service</a>
                <a href="#" style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Baloo 2', Arial, sans-serif;">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>

  `;

    await sendEmail(email, subject, html);
};
module.exports = fundraiseLive;
