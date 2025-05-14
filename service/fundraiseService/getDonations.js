const { FundRaiseDonor } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllDonation = async ({ page = 1, fundraiseId }) => {
  console.log(fundraiseId);
  const filter = {
    isFundPaid: true,
  };

  if (fundraiseId) {
    filter.fundRaiseId = fundraiseId;
  }

  try {
    const getDonation = await getPaginatedData({
      model: FundRaiseDonor,
      filters: filter,
      page,
      limit: 20,
      includeUser: false,
      exclude: [
        "fundRaiseId",
        "from",
        "walletInfo",
        "signature",
        "currentAmount",
        "email",
        "_id",
        "createdAt",
        "__v",
        "tokenTypes",
        "walletAddres",
      ],
    });

    return getDonation;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = getAllDonation;
