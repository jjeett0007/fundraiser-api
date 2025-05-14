const { FundRaiseVerify } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllVerificationData = async ({ page = 1 }) => {
  const filter = {};

  try {
    const fundRaiseVerifications = await getPaginatedData({
      model: FundRaiseVerify,
      filters: filter,
      page,
      limit: 10,
      includeUser: true,
      populate: [], 
      exclude: [],
    });

    return fundRaiseVerifications;
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};
