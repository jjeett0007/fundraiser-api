const { sendEmail } = require("../../lib/smtp");

const fundRaiseCreated = async (data) => {
  const { email, name, date, device, location } = data;

  const subject = "You're on the List";

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;" class="container">
        
        <div style="text-align: center; padding: 20px 0;">
            <img style="max-width: 250px; height: auto;" class="logo" alt="EMERG FUNDS Logo" src="https://www.emergfunds.org/logo-red.png">
        </div>
        
        
        <div style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #F5ECD9 0%, #E9B96E 100%); border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: #0F1A2C; margin-bottom: 15px; font-size: 32px; font-family: 'Times New Roman', Times, serif; font-weight: 700;" class="hero-text">You're on the List! 
                <br>
                <br>
            Get Ready for Something Big</h1>
            <p style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 18px; margin-bottom: 25px;">Welcome to the EMERG FUNDS early access community</p>
            <div style="background-color: #C01A27; color: #FFFFFF; padding: 15px 35px; border-radius: 6px; font-weight: bold; display: inline-block; font-family: 'Times New Roman', Times, serif; font-size: 18px;">✓ Waitlist Confirmed</div>
        </div>
        
        
        <div style="padding: 20px; background-color: #FFFFFF;">
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px;">Dear Future Emergency Hero,</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px;">Thank you for joining the <strong>EMERG FUNDS</strong> waitlist! You're now part of an exclusive community that will get first access to the most powerful emergency fundraising platform ever created.</p>
            
            <p style="margin-bottom: 25px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px;">We're putting the finishing touches on something revolutionary – a platform that will change how people get help during their most critical moments.</p>
            
            
            <div style="background-color: #F5ECD9; padding: 25px; border-radius: 8px; margin: 30px 0; text-align: center;">
                <h2 style="color: #C01A27; margin-bottom: 20px; font-size: 24px; font-family: 'Times New Roman', Times, serif; font-weight: 600;">Join 5,000+ People Waiting</h2>
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody><tr>
                        <td style="text-align: center; padding: 10px;" width="33%" class="stat-box">
                            <div style="color: #C01A27; font-size: 36px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">#2,847</div>
                            <p style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 14px; margin: 5px 0;">Your Waitlist Position</p>
                        </td>
                        <td style="text-align: center; padding: 10px;" width="33%" class="stat-box">
                            <div style="color: #C01A27; font-size: 36px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">2 Weeks</div>
                            <p style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 14px; margin: 5px 0;">Estimated Launch</p>
                        </td>
                        <td style="text-align: center; padding: 10px;" width="33%" class="stat-box">
                            <div style="color: #C01A27; font-size: 36px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">Early</div>
                            <p style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 14px; margin: 5px 0;">Access Guaranteed</p>
                        </td>
                    </tr>
                </tbody></table>
            </div>
            
            <h2 style="color: #0F1A2C; margin: 30px 0 20px; font-size: 24px; font-family: 'Times New Roman', Times, serif; font-weight: 600;">What You'll Get as an Early Access Member:</h2>
            
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody><tr>
                    <td style="padding: 15px;" valign="top" width="50%" class="feature-box">
                        <div style="background-color: #F5ECD9; padding: 20px; border-radius: 8px; height: auto;">
                            <div style="font-size: 32px; margin-bottom: 10px; text-align: center;">🎯</div>
                            <h3 style="color: #C01A27; margin-bottom: 8px; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: center;">First Access</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; text-align: center;">Be among the first to create campaigns and access all features.</p>
                        </div>
                    </td>
                    <td style="padding: 15px;" valign="top" width="50%" class="feature-box">
                        <div style="background-color: #F5ECD9; padding: 20px; border-radius: 8px; height: auto;">
                            <div style="font-size: 32px; margin-bottom: 10px; text-align: center;">💎</div>
                            <h3 style="color: #C01A27; margin-bottom: 8px; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: center;">Premium Features</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; text-align: center;">Exclusive access to advanced fundraising tools and analytics.</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px;" valign="top" width="50%" class="feature-box">
                        <div style="background-color: #F5ECD9; padding: 20px; border-radius: 8px; height: auto;">
                            <div style="font-size: 32px; margin-bottom: 10px; text-align: center;">🎁</div>
                            <h3 style="color: #C01A27; margin-bottom: 8px; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: center;">Special Bonuses</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; text-align: center;">Reduced fees and exclusive resources for early adopters.</p>
                        </div>
                    </td>
                    <td style="padding: 15px;" valign="top" width="50%" class="feature-box">
                        <div style="background-color: #F5ECD9; padding: 20px; border-radius: 8px; height: auto;">
                            <div style="font-size: 32px; margin-bottom: 10px; text-align: center;">👥</div>
                            <h3 style="color: #C01A27; margin-bottom: 8px; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: center;">VIP Support</h3>
                            <p style="font-size: 15px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; text-align: center;">Direct line to our team and priority customer support.</p>
                        </div>
                    </td>
                </tr>
            </tbody></table>
            
            
            <div style="background-color: #F5ECD9; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #C01A27;">
                <h3 style="color: #C01A27; margin-bottom: 15px; font-size: 20px; font-family: 'Times New Roman', Times, serif;">What's Coming Next?</h3>
                <p style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px; margin-bottom: 15px;">We're in the final stages of testing and will be sending out early access invitations very soon. Keep an eye on your inbox – your invitation will include:</p>
                <ul style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 15px; margin: 10px 0; padding-left: 20px;">
                    <li>Your unique early access code</li>
                    <li>Step-by-step setup guide</li>
                    <li>Exclusive video walkthrough</li>
                    <li>Direct contact to our support team</li>
                </ul>
            </div>
            
            <h2 style="color: #0F1A2C; margin: 30px 0 20px; font-size: 24px; font-family: 'Times New Roman', Times, serif; font-weight: 600;">While You Wait:</h2>
            
            <ul style="padding-left: 25px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px; margin-bottom: 25px;">
                <li style="margin-bottom: 8px;">Follow us on social media for behind-the-scenes updates</li>
                <li style="margin-bottom: 8px;">Share your waitlist confirmation with friends (they'll thank you later!)</li>
                <li style="margin-bottom: 8px;">Think about your first campaign – what cause means most to you?</li>
                <li style="margin-bottom: 8px;">Join our private Facebook group for early access members</li>
                <li style="margin-bottom: 0;">Watch for our weekly progress updates in your inbox</li>
            </ul>
            
            
            <div style="text-align: center; background-color: #F5ECD9; padding: 30px; border-radius: 8px; margin: 30px 0;">
                <h2 style="color: #0F1A2C; margin-bottom: 15px; font-size: 26px; font-family: 'Times New Roman', Times, serif; font-weight: 700;">Want to Move Up the List?</h2>
                <p style="color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px; margin-bottom: 25px;">Share EMERG FUNDS with friends and family to get earlier access!</p>
                
                <div style="margin: 20px 0;">
                    <a style="background-color: #C01A27; color: #FFFFFF; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 5px;" class="button" href="https://www.emergfunds.org/refer">Share &amp; Get Early Access</a>
                    <a style="background-color: #0F1A2C; color: #FFFFFF; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 5px;" class="button" href="https://www.emergfunds.org/community">Join Our Community</a>
                </div>
            </div>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px;">We can't wait to see the amazing impact you'll make with EMERG FUNDS. Thank you for believing in our mission to help people in their time of greatest need.</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px;">Your early access invitation is coming soon!</p>
            
            <p style="margin-bottom: 20px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif; font-size: 16px;">With excitement and gratitude,<br>The EMERG FUNDS Team</p>
        </div>
        
        
        <div style="margin-top: 30px; text-align: center; background-color: #F5ECD9; padding: 20px; border-radius: 8px;">
            <p style="margin-bottom: 15px; color: #0F1A2C; font-weight: bold; font-family: 'Times New Roman', Times, serif;">Stay Connected for Updates</p>
            <div>
                <a style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;" href="https://www.emergfunds.org/">📱</a>
                <a style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;" href="https://www.emergfunds.org/">📘</a>
                <a style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;" href="https://www.emergfunds.org/">📸</a>
                <a style="display: inline-block; margin: 0 10px; color: #C01A27; text-decoration: none; font-size: 24px;" href="https://x.com/EmergFunds_">🐦</a>
            </div>
        </div>
        
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E9B96E; text-align: center; font-size: 12px; color: #0F1A2C; font-family: 'Times New Roman', Times, serif;">
            <p style="margin-bottom: 10px;">© 2025 EMERG FUNDS. All rights reserved.</p>
            <p style="margin-bottom: 10px;">
                <a style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', Times, serif;" href="https://www.emergfunds.org/">Privacy Policy</a>
                <a style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', Times, serif;" href="https://www.emergfunds.org/">Terms of Service</a>
                <a style="color: #C01A27; text-decoration: none; margin: 0 10px; font-family: 'Times New Roman', Times, serif;" href="https://www.emergfunds.org/">Contact Us</a>
            </p>
            <p style="margin-bottom: 10px;">
                <a style="color: #C01A27; text-decoration: none; font-family: 'Times New Roman', Times, serif;" href="https://www.emergfunds.org/unsubscribe">Leave Waitlist</a> | 
                <a style="color: #C01A27; text-decoration: none; font-family: 'Times New Roman', Times, serif;" href="https://www.emergfunds.org/preferences">Update Preferences</a>
            </p>
            <p style="color: #0F1A2C; font-size: 11px;">
                EMERG FUNDS, To the World<br>
                You received this email because you joined our waitlist for early access to emergency fundraising.
            </p>
        </div>
    </div>
  `;

  await sendEmail(email, subject, html);
};
module.exports = fundRaiseCreated;
