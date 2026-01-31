import express from "express";
import {
  getOrderByid,
  getOwnerOrderController,
  getUserOrderController,
  placeOrderController,
  statusChangesController,
  sendDeliveryOtpController
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

router.post(
  "/owner-order-fetch/:orderId/:shopId",
  authenticationMiddleware,
  statusChangesController
);

router.get(
  "/orderbyId/:orderId", 
  authenticationMiddleware,
  getOrderByid
)

router.post("/send-delivery-otp", authenticationMiddleware, sendDeliveryOtpController)
router.post("/delivered", authenticationMiddleware, sendDeliveryOtpController)

export default router;
