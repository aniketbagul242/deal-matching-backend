
import express from "express";
import { loginUser, userRegister } from "../controllers/auth.controller.js";


const authRoutes = express.Router();

authRoutes.post("/register", userRegister);
authRoutes.post("/login", loginUser);

export default authRoutes;