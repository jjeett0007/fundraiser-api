const FundRaise = require("./fundraise/index");
const User = require("./user/user");
const Otp = require("./otp/otp");
const Token = require("./token/index");
const FundRaiseDonor = require("./fundraise/donor");

module.exports = {
  FundRaise,
  FundRaiseDonor,
  User,
  Otp,
  Token
};
