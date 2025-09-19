import { Request, Response } from "express";
import { getChatHistoryService } from "../services/messages.js";

const getChatHistoryController = async (req: Request, res: Response) => {
  try {
    const myId = (req as any).user.id;
    const otherId = req.params.userId;

    const messages = await getChatHistoryService(myId, otherId);
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to load messages" });
  }
};

export { getChatHistoryController };