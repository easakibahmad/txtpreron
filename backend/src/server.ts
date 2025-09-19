import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { socketHandler } from "./socket/socketHandler.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Init socket.io
socketHandler(io);

// Connect DB and start server
connectDB(process.env.MONGO_URI as string).then(() => {
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
