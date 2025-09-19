import { Server, Socket } from "socket.io";
import Message from "../models/Message.js";

let onlineUsers: Record<string, string> = {}; // socket.id -> userId

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (userId: string) => {
      onlineUsers[socket.id] = userId;
      socket.join(userId);
      io.emit("onlineUsers", Object.values(onlineUsers));
    });

    // Send message
    socket.on("sendMessage", async (data) => {
      const { sender, receiver, text } = data;
      const message = new Message({ sender, receiver, text });
      await message.save();

      io.to(receiver).emit("receiveMessage", message);
      io.to(sender).emit("receiveMessage", message);
    });

    // Typing indicator
    socket.on("typing", ({ sender, receiver }) => {
      io.to(receiver).emit("typing", sender);
    });

    // Disconnect
    socket.on("disconnect", () => {
      delete onlineUsers[socket.id];
      io.emit("onlineUsers", Object.values(onlineUsers));
      console.log("User disconnected:", socket.id);
    });
  });
};
