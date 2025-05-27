const {
  FundRaise,
  User,
  FundRaiseDonor,
  FundRaiseVerify,
  WaitList
} = require("../../model/index");

const getStatics = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const yearStart = new Date(now.getFullYear(), 0, 1);
  const MONTHS = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const weekRanges = [
    { start: new Date(year, month, 1), end: new Date(year, month, 8) },
    { start: new Date(year, month, 8), end: new Date(year, month, 15) },
    { start: new Date(year, month, 15), end: new Date(year, month, 22) },
    { start: new Date(year, month, 22), end: startOfNextMonth }
  ];

  try {
    const [
      totalUsers,
      totalVerifiedUsers,
      userGrowth,
      totalFundRaisers,
      totalFundRaiseAmount,
      activeFundRaisers,
      totalDonations,
      monthlyDonations,
      monthlyFundraisingStats,
      categorySuccessRate,
      geographicalDistribution,
      totalWaitList,
      currentMonthDonationReport,
      totalNewUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        isVerified: true
      }),
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: yearStart }
          }
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            isActive: {
              $cond: [
                {
                  $gte: [
                    "$lastLogin", // or "$lastActivity"
                    new Date(now.getFullYear(), 0, 1)
                  ]
                },
                true,
                false
              ]
            }
          }
        },
        {
          $group: {
            _id: "$month",
            newUser: { $sum: 1 },
            activeUser: {
              $sum: {
                $cond: ["$isActive", 1, 0]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            month: "$_id",
            newUser: 1,
            activeUser: 1
          }
        },
        {
          $sort: { month: 1 }
        }
      ]),
      FundRaise.countDocuments(),
      FundRaise.aggregate([
        {
          $match: {
            "statics.totalRaised": { $gt: 0 }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$statics.totalRaised" }
          }
        }
      ]),
      FundRaise.countDocuments({
        isFundRaiseStarted: true,
        isFundRaiseActive: true
      }),
      FundRaiseDonor.countDocuments({
        isFundPaid: true
      }),
      FundRaiseDonor.aggregate([
        {
          $match: {
            isFundPaid: true,
            createdAt: {
              $gte: new Date(new Date().getFullYear(), 0, 1),
              $lt: new Date(new Date().getFullYear() + 1, 0, 1)
            }
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $project: {
            month: {
              $arrayElemAt: [
                [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"
                ],
                "$_id"
              ]
            },
            totalAmount: 1,
            _id: 0
          }
        },
        {
          $sort: { month: 1 }
        }
      ]),
      FundRaise.aggregate([
        {
          $match: {
            isDeleted: false,
            createdAt: { $ne: null }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            totalGoal: { $sum: "$fundMetaData.goalAmount" },
            totalDonations: { $sum: "$statics.totalRaised" }
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        },
        {
          $project: {
            _id: 0,
            month: {
              $concat: [
                {
                  $arrayElemAt: [
                    [
                      "",
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec"
                    ],
                    "$_id.month"
                  ]
                },
                " ",
                { $toString: "$_id.year" }
              ]
            },
            totalGoal: 1,
            totalDonations: 1
          }
        }
      ]),
      FundRaise.aggregate([
        {
          $match: {
            isDeleted: false,
            fundMetaData: { $exists: true },
            "fundMetaData.category": { $ne: null },
            "fundMetaData.goalAmount": { $gt: 0 },
            statics: { $exists: true }
          }
        },
        {
          $group: {
            _id: "$fundMetaData.category",
            total: { $sum: 1 },
            successful: {
              $sum: {
                $cond: [
                  {
                    $gte: ["$statics.totalRaised", "$fundMetaData.goalAmount"]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            successRate: {
              $multiply: [{ $divide: ["$successful", "$total"] }, 100]
            }
          }
        },
        {
          $sort: { category: 1 }
        }
      ]),
      FundRaiseVerify.aggregate([
        {
          $match: {
            "userVerificationData.country": { $exists: true, $ne: null }
          }
        },
        {
          $group: {
            _id: {
              $cond: [
                {
                  $in: [
                    { $toUpper: "$userVerificationData.country" },
                    ["USA", "NIGERIA", "UK", "CANADA", "AUSTRIA"]
                  ]
                },
                { $toUpper: "$userVerificationData.country" },
                "OTHER"
              ]
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
            countries: {
              $push: {
                country: "$_id",
                count: "$count"
              }
            }
          }
        },
        {
          $unwind: "$countries"
        },
        {
          $project: {
            _id: 0,
            country: "$countries.country",
            percentage: {
              $round: [
                {
                  $multiply: [{ $divide: ["$countries.count", "$total"] }, 100]
                },
                1
              ]
            }
          }
        }
      ]),
      WaitList.countDocuments(),
      FundRaiseDonor.aggregate([
        {
          $match: {
            isFundPaid: true,
            createdAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth
            }
          }
        },
        {
          $group: {
            _id: null,
            totalDonations: { $sum: 1 },
            totalDonationAmount: { $sum: "$amount" }
          }
        }
      ]),
      User.countDocuments({
        createdAt: {
          $gte: startOfMonth,
          $lt: startOfNextMonth
        }
      })
    ]);

    const donationAmounts = await Promise.all(
      weekRanges.map(({ start, end }) =>
        FundRaiseDonor.aggregate([
          {
            $match: {
              createdAt: { $gte: start, $lt: end }
            }
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" }
            }
          }
        ])
      )
    );

    const formattedDonations = donationAmounts.map((res, i) => ({
      week: `Week ${i + 1}`,
      totalAmount: res[0]?.totalAmount || 0
    }));

    return {
      code: 200,
      message: "Statics fetched successfully",
      data: {
        userStatics: {
          totalUsers,
          totalActiveUser: totalVerifiedUsers,
          userGrowth,
          totalNewUsers
        },
        fundraiseStats: {
          totalFundRaisers,
          totalFundRaiseAmount: totalFundRaiseAmount[0]?.totalAmount || 0,
          activeFundRaisers,
          monthlyFundraisingStats
        },
        donationStats: {
          totalDonations,
          monthlyDonations,
          currentMonthDonationReport,
          weeklyDonationReport: formattedDonations
        },
        categoryGeo: {
          categorySuccessRate,
          geographicalDistribution
        },
        waitList: totalWaitList
      }
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {
      code: 500,
      message: "Internal server error",
      data: null
    };
  }
};

module.exports = getStatics;
