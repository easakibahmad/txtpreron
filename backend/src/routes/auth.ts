import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.js";
import { AUTH } from "../constants/index.js";

const authRoutes = Router();

authRoutes.post(AUTH.REGISTER, registerController);
authRoutes.post(AUTH.LOGIN, loginController);

export default authRoutes;
