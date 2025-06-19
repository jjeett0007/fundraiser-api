const { User } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllUser = async ({ page = 1, limit = 20 }) => {
  try {
    const users = await getPaginatedData({
      model: User,
      filters: {},
      page,
      limit,
      includeUser: false,
      exclude: [
        "password",
        "appleId",
        "googleId",
        "updatedAt",
        "__v",
        "fundRaiseData",
        "statics",
        "address",
        "lastUpdated",
        "lastLogin"
      ]
    });

    return {
      code: 200,
      data: users
    };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = getAllUser;
