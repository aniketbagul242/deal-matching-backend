import dealModel from "../models/deal.model.js";
import investmentModel from "../models/investment.model.js";



const getAnalytics = async (req, res) => {
  try {
    const totalDeals = await dealModel.countDocuments();
    const totalInvestments = await investmentModel.countDocuments();

    const totalRaised = await investmentModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const closedDeals = await dealModel.countDocuments({ status: "CLOSED" });

    const conversionRate =
      totalDeals === 0 ? 0 : (closedDeals / totalDeals) * 100;

    return res.json({
      success: true,
      data: {
        totalDeals,
        totalInvestments,
        totalRaised: totalRaised[0]?.total || 0,
        conversionRate
      }
    });

  } catch (error) {
    return res.json({ success: false, message: "Error" });
  }
};

export { getAnalytics };