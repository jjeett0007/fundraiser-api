const { WaitList } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getWaitlist = async ({ page = 1, limit = 20 }) => {
  try {
    const waitlist = await getPaginatedData({
      model: WaitList,
      filters: {},
      page,
      limit,
      includeUser: false,
      exclude: ["createdAt", "__v"],
    });

    return {
      code: 200,
      data: waitlist,
    };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Server error.", error };
  }
};
module.exports = getWaitlist;
