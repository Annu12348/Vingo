import express from "express";
import {
  getdeliveryAssignmentController,
  getDeliveryAssignmentByIdController,
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

export default router;
