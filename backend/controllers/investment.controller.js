import dealModel from "../models/deal.model.js";
import investmentModel from "../models/investment.model.js";


const investInDeal = async (req, res) => {
  const { dealId, amount } = req.body;

  try {
    const deal = await dealModel.findById(dealId);

    if (!deal) {
      return res.json({ success: false, message: "Deal not found" });
    }

    if (deal.currentRaisedAmount + amount > deal.targetAmount) {
      return res.json({ success: false, message: "Over investment not allowed" });
    }

    deal.currentRaisedAmount += amount;

    if (deal.currentRaisedAmount >= deal.targetAmount) {
      deal.status = "CLOSED";
    } else {
      deal.status = "PARTIALLY_FILLED";
    }

    await deal.save();

    const investment = new investmentModel({
      investorId: req.user.id,
      dealId,
      amount
    });

    await investment.save();

    return res.json({ success: true, investment });

  } catch (error) {
    return res.json({ success: false, message: "Error investing" });
  }
};

export { investInDeal };