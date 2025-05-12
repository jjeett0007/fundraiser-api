const { FundRaiseDonor } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getDonations = async ({ }) => {
    const filter = {}

    const fundRaises = await getPaginatedData({
        model: FundRaise,
        filters: filter,
        page,
        limit: 9,
        includeUser: false,
        exclude: [
            "createdBy",
            "contractAddress",
            "contract",
            "isFundRaiseStarted",
            "isFundRaiseEnded",
            "isFundRaiseActive",
            "isFundRaiseFunded",
            "isFundRaisedStopped",
            "isFundRaiseDeleted",
            "isFundRaiseFundsComplete",
            "isFundRaiseFundedCompletely",
            "isFundRaisedEndDate",
            "isDeleted",
            "verify.verificationId",
            "verify.isFundRaiseVerifiedDate",
            "verify.isFundRaiseVerifiedBy",
            "verify.isFundRaiseVerifiedComment",
            "verify.isFundRaiseVerifiedStatus",
            "isFundRaiseDeactivated",
            "createdAt",
            "updatedAt",
            "__v",
            "fundMetaData.walletAddress",
            "fundMetaData.videoUrl",
            "staticsts.averageDonation",
            "staticsts.largestAmount",
        ]
    });

    try { } catch (error) {
        return error
    }
}

module.exports = getDonations