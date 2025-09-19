import { Request, Response } from "express";
import { getAllUsersService } from "../services/users.js";

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const myId = (req as any).user.id;
    const users = await getAllUsersService(myId);
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch users" });
  }
};

export { getAllUsersController };