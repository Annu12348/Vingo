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
//assignment ko find assignedTo, status ke based per with populate karna hai (assignedTo, shop, order ke ander user ko)
//order se shopOrders ko nikalkar find karo assined and shopOrder ke matches based
//_id: order ke id, order ke user, shoporders, deliveryAddress order ke, deliveryBoylocation, customerlocation, 