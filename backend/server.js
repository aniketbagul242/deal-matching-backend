
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import "./jobs/dealStatus.job.js"; 
import { errorHandler } from "./middleware/error.middleware.js";


const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// DB connect
connectDB();


// routes
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/analytics", analyticsRoutes);


app.get("/", (req, res) => {
  res.send(" API Running");
});

// error handler
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});