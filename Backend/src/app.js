import express from "express";
const app = express();
const server = http.createServer(app)
import authRoutes from "./routes/auth.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import itemRoutes from "./routes/item.routes.js";
import orderRoutes from "./routes/order.routes.js"
import deliveryAssimentRoutes from "./routes/deliveryAssignment.routes.js"
import cookiParser from "cookie-parser";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
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

export default app;
