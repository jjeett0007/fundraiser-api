const nodemailer = require("nodemailer");
const config = require("../config/index");

const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: true,
  auth: {
    user: config.email.smtp.auth.username,
    pass: config.email.smtp.auth.password
  }
});

if (config.env !== "test") {
  if (transporter) {
    transporter
      .verify()
      .then(() => console.log("connected to SMTP SERVER"))
      .catch((error) =>
        console.error("failed to connect to SMTP SERVER", error)
      );
  }
}

const sendEmail = async (to, subject, html) => {
  try {
    const msg = { from: config.email.from, to, subject, html };
    await transporter.sendMail(msg);
    console.log("email sent")
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = { transporter, sendEmail };
