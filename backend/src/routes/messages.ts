import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getChatHistoryController } from "../controllers/messages.js";
import { MESSAGE } from "../constants/index.js";

const messageRoutes = Router();

messageRoutes.get(MESSAGE.USERID, authMiddleware, getChatHistoryController);

export default messageRoutes;

