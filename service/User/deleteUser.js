const { User, FundRaise } = require("../../model/index");

const deleteuser = async (data) => {
  try {
    await User.findByIdAndDelete(data);
    await FundRaise.deleteMany({ createdBy: data });
    return {
      code: 301,
      message: "User Destroyed"
    };
  } catch (error) {
    return error;
  }
};
module.exports = deleteuser;
