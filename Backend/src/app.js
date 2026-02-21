import express from "express";
import cookiParser from "cookie-parser";
import cors from "cors";
import http from "http"
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import itemRoutes from "./routes/item.routes.js";
import orderRoutes from "./routes/order.routes.js"
import deliveryAssimentRoutes from "./routes/deliveryAssignment.routes.js"
import { socketIoHandler } from "./socket/socket.js";

const app = express();
app.set("trust proxy", 1);  
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://vingo-olive.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["POST", "GET"],
  }
});

app.set("io", io)

app.use(
  cors({
    origin: [
      "https://vingo-olive.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(cookiParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);
app.use("/item", itemRoutes);
app.use("/order", orderRoutes);
app.use("/deliveryBoy", deliveryAssimentRoutes);

socketIoHandler(io)
export default server;
