import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    preferredIndustries: [String],

    riskAppetite: String,

    budgetMin: Number,
    budgetMax: Number
  },
  { timestamps: true }
);

const investorPreferenceModel = mongoose.model(
  "InvestorPreference",
  preferenceSchema
);

export default investorPreferenceModel;