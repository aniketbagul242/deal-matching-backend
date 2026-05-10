import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal"
    },

    amount: Number
  },
  { timestamps: true }
);

const investmentModel = mongoose.model("Investment", investmentSchema);

export default investmentModel;