
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { getAnalytics } from "../controllers/analytics.controller.js";


const analyticsRoutes = express.Router();
// only corporate/admin can view analytics
analyticsRoutes.get(
  "/",
  authMiddleware,
  roleMiddleware(["corporate", "admin"]),
  getAnalytics
);

export default analyticsRoutes;