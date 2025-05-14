const { User } = require("../../model/index");

const getLoggedUser = async (data) => {
  try {
    const user = await User.findById(data).select(
      "_id email profile address profileImages statics createdAt"
    );

    return {
      code: 200,
      data: user,
    };
  } catch (error) {
    return error;
  }
};
module.exports = getLoggedUser;
