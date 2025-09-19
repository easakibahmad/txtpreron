import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../types/index.js";

const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export { authMiddleware };