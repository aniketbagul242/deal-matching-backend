
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { investInDeal } from "../controllers/investment.controller.js";



const investmentRoutes = express.Router();

// invest in a deal
investmentRoutes.post("/", authMiddleware, investInDeal);

export default investmentRoutes;