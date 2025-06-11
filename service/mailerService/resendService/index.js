const resend = require("../../../lib/resendLib");

const audienceId = `dbd2268f-37b7-4f3e-81cc-f1b345a04635`;

const addContact = async ({ email, firstName, lastName }) => {
  try {
    const response = await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId
    });

    return {
      code: 200,
      data: response
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.message || "Server error",
      error
    };
  }
};

const updateSubscriptionByMail = async ({ email, status }) => {
  try {
    const response = await resend.contacts.update({
      email,
      audienceId,
      unsubscribed: status
    });

    return {
      code: 200,
      data: response
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.message || "Server error",
      error
    };
  }
};

const createBroadCast = async ({ subject, html }) => {
  try {
    const response = await resend.broadcasts.create({
      audienceId,
      from: "EmergFunds News <newsletter@emergfunds.org>",
      subject,
      html
    });

    return {
      code: 200,
      data: response
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.message || "Server error",
      error
    };
  }
};

const broadcasts = async ({ broadCastId }) => {
  try {
    const broadcast = await resend.broadcasts.send(broadCastId, {
      scheduledAt: "in 1 min"
    });

    return {
      code: 200,
      data: broadcast
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.message || "Server error",
      error
    };
  }
};

const deleteContact = async ({ email }) => {
  try {
    const response = await resend.contacts.remove({ email, audienceId });

    return {
      code: 200,
      data: response
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.message || "Server error",
      error
    };
  }
};

module.exports = {
  addContact,
  updateSubscriptionByMail,
  createBroadCast,
  broadcasts,
  deleteContact
};
