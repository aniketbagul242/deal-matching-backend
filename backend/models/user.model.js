import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    role: {
      type: String,
      enum: ["investor", "corporate", "admin"],
      default: "investor"
    },

    riskAppetite: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    preferredIndustries: [String],

    budgetMin: Number,
    budgetMax: Number
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;