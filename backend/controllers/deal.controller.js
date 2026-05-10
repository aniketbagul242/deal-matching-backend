import dealModel from "../models/deal.model.js";

// create deal
const createDeal = async (req, res) => {
  try {
    const deal = new dealModel(req.body);
    await deal.save();

    return res.json({ success: true, deal });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error creating deal" });
  }
};

// get all deals
const getDeals = async (req, res) => {
  try {
    const {
      industry,
      riskLevel,
      minROI,
      maxROI,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc"
    } = req.query;

    // build filter object
    const filter = {};

    if (industry) filter.industry = industry;
    if (riskLevel) filter.riskLevel = riskLevel;

    if (minROI || maxROI) {
      filter.expectedROI = {};
      if (minROI) filter.expectedROI.$gte = Number(minROI);
      if (maxROI) filter.expectedROI.$lte = Number(maxROI);
    }

    const skip = (page - 1) * limit;

    const deals = await dealModel
      .find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await dealModel.countDocuments(filter);

    return res.json({
      success: true,
      data: deals,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    return res.json({
      success: false,
      message: "Error fetching deals"
    });
  }
};


// recommended deals (simple matching logic)
const getRecommendedDeals = async (req, res) => {
  try {
    const user = req.user;

    const { page = 1, limit = 10 } = req.query;

    const deals = await dealModel.find();

    const scored = deals.map((deal) => {
      let score = 0;

      if (deal.riskLevel === user.riskAppetite) score += 30;

      if (user.preferredIndustries?.includes(deal.industry)) score += 25;

      if (
        deal.minInvestment >= user.budgetMin &&
        deal.maxInvestment <= user.budgetMax
      ) {
        score += 20;
      }

      score += deal.expectedROI / 10;

      return { deal, score };
    });

    const sorted = scored.sort((a, b) => b.score - a.score);

    const start = (page - 1) * limit;
    const paginated = sorted.slice(start, start + Number(limit));

    return res.json({
      success: true,
      data: paginated,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: sorted.length
      }
    });

  } catch (error) {
    return res.json({
      success: false,
      message: "Error"
    });
  }
};

export { createDeal, getDeals, getRecommendedDeals };