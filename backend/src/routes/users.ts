import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getAllUsersController } from "../controllers/users.js";
import { USERS } from "../constants/index.js";


const userRoutes = Router();

userRoutes.get(USERS.ALL, authMiddleware, getAllUsersController);

export default userRoutes;
