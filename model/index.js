const FundRaise = require("./fundraise/index");
const User = require("./user/user");
const Otp = require("./otp/otp");
const Token = require("./token/index");
const FundRaiseDonor = require("./fundraise/donor");
const WaitList = require("./waitlist/index");
const WalletAddress = require("./Address/index");
const Admin = require("./Admin/index")
const FundRaiseVerify = require("./fundraise/verification")

module.exports = {
  FundRaise,
  FundRaiseDonor,
  User,
  Otp,
  Token,
  WaitList,
  WalletAddress,
  Admin,
  FundRaiseVerify
};
