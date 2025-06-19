const fundraiseWithdrawalMail = require("./withdrawalMail");
const donationUserMail = require("./donationUserMail");
const donationCreatorNotify = require("./donateCreatorNotification");
const fundRaiseCreated = require("./fundraise-create");
const fundraiseLive = require("./launced-fundraise-mail");
const withDrawalFailed = require("./withdrawalFailed");

module.exports = {
  fundraiseWithdrawalMail,
  donationUserMail,
  donationCreatorNotify,
  fundRaiseCreated,
  fundraiseLive,
  withDrawalFailed
};
