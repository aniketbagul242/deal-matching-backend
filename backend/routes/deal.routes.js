import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createDeal, getDeals, getRecommendedDeals } from "../controllers/Deal.controller.js";


const dealRoutes = express.Router();

// create deal (corporate side)
dealRoutes.post("/", authMiddleware, createDeal);

// get all deals
dealRoutes.get("/", getDeals);

// recommended deals (investor side)
dealRoutes.get("/recommended", authMiddleware, getRecommendedDeals);

export default dealRoutes;