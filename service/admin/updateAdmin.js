const { Admin } = require("../../model/index");

const updateAdminById = async ({ userId, profileInfo = {}, avatar, address = {} }) => {
  try {
    const { phoneNumber, firstName, lastName, displayName } = profileInfo;
    const { country, state, city } = address;

    const currentUser = await Admin.findById(userId);

    if (!currentUser) {
      return { code: 404, message: "User not found" };
    }

    // Create set fields object directly with conditional assignments
    const setFields = {
      ...(phoneNumber && { "profile.phoneNumber": phoneNumber }),
      ...(displayName && { "profile.displayName": displayName }),
      ...(avatar && { "profileImages.avatar": avatar }),
      ...(country && { "address.country": country }),
      ...(state && { "address.state": state }),
      ...(city && { "address.city": city })
    };

    let nameUpdateMessage = "";

    // Handle name update
    if (firstName && lastName) {
      const daysSinceLastUpdate = Math.floor(
        (Date.now() - new Date(currentUser.lastUpdated)) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastUpdate > 10) {
        Object.assign(setFields, {
          "profile.firstName": firstName,
          "profile.lastName": lastName,
          lastUpdated: new Date()
        });
      } else {
        nameUpdateMessage = ` Name not updated, Name change will be available in ${
          10 - daysSinceLastUpdate
        } days.`;
      }
    }

    // Only perform update if there are fields to update
    if (Object.keys(setFields).length) {
      await Admin.findByIdAndUpdate(userId, { $set: setFields }, { new: true });
      return {
        code: 200,
        message: `User successfully updated.${nameUpdateMessage}`
      };
    }

    return { code: 200, message: `No changes to update.${nameUpdateMessage}` };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      code: 500,
      message: "Internal Server Error",
      error: error.message
    };
  }
};

module.exports = updateAdminById;
