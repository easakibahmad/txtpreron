import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getChatHistoryController } from "../controllers/messages.js";

const messageRoutes = Router();

messageRoutes.get("/:userId", authMiddleware, getChatHistoryController);

export default messageRoutes;

