import express from "express";
import {
  getdeliveryAssignmentController,
  getDeliveryAssignmentByIdController,
  getCurrentDeliveryAssignmentController,
  getOrderByid,
} from "../controller/deliveryAssignment.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get(
  "/assiments",
  authenticationMiddleware,
  getdeliveryAssignmentController
);
router.post(
  "/:assignmentId",
  authenticationMiddleware,
  getDeliveryAssignmentByIdController
);
router.get(
  "/assignment/accept", 
  authenticationMiddleware, 
  getCurrentDeliveryAssignmentController
)
router.get(
  "/orderbyId/:orderId", 
  authenticationMiddleware,
  getOrderByid
)

export default router;
