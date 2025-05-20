const { sendEmail } = require("../../lib/smtp");

const fundRaiseCreated = async (data) => {
  const { email, name, date, device, location } = data;

  const subject = "Password Reset Successful";

  const html = `

  `;

  await sendEmail(email, subject, html);
};
module.exports = fundRaiseCreated;
