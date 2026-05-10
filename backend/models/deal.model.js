import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    companyName: String,
    industry: String,

    investmentRequired: Number,
    targetAmount: Number,

    currentRaisedAmount: {
      type: Number,
      default: 0
    },

    expectedROI: Number,

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"]
    },

    description: String,

    minInvestment: Number,
    maxInvestment: Number,

    closingDate: Date,

    tags: [String],

    status: {
      type: String,
      enum: ["OPEN", "PARTIALLY_FILLED", "CLOSED"],
      default: "OPEN"
    }
  },
  { timestamps: true }
);

const dealModel = mongoose.model("Deal", dealSchema);

export default dealModel;