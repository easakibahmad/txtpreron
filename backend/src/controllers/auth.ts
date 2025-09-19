import { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.js";

const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    await registerService(username, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Registration failed" });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Login failed" });
  }
};

export { registerController, loginController };
