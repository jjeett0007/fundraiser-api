const { FundRaiseDonor } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getDonations = async ({ fundraiseId, page = 1 }) => {
    const filter = {}

    try {
        const fundRaisesDonate = await getPaginatedData({
            model: FundRaiseDonor,
            filters: filter,
            page,
            limit: 20,
            includeUser: false,
            exclude: [

            ]
        });

        return fundRaisesDonate

    } catch (error) {
        return error
    }
}

module.exports = getDonations