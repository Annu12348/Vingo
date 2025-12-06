import express from "express";
import {
  getOwnerOrderController,
  getUserOrderController,
  placeOrderController,
} from "../controller/order.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/place-order", authenticationMiddleware, placeOrderController);
router.get(
  "/user-order-fetch",
  authenticationMiddleware,
  getUserOrderController
);
router.get(
  "/owner-order-fetch",
  authenticationMiddleware,
  getOwnerOrderController
);

export default router;
