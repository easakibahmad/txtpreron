import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getAllUsersController } from "../controllers/users.js";


const userRoutes = Router();

userRoutes.get("/", authMiddleware, getAllUsersController);

export default userRoutes;
