import mongoose, { Document } from "mongoose";
import { Request } from "express";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;  
  receiver: mongoose.Types.ObjectId;
  text: string;
  timestamp: Date;
}

interface IAuthRequest extends Request {
  user?: { id: string };
}

export type { IUser, IMessage, IAuthRequest };