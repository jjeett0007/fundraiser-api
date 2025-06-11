const { Resend } = require("resend");
const config = require("../config/index");

const resend = new Resend(config.email.smtp.auth.password);

module.exports = resend;
