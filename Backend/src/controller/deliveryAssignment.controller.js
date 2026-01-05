import mongoose from "mongoose";
import DeliveryAssignmentModel from "../models/deliveryAssignment.model.js";
import orderModel from "../models/order.models.js";

export const getdeliveryAssignmentController = async (req, res) => {
  try {
    const deliveryBoy = req.user.id;

    const assignments = await DeliveryAssignmentModel.find({
      brodcastedTo: deliveryBoy,
      status: "brodcasted",
    })
      .populate("order")
      .populate("shop");

    const format = assignments.map((assignment) => {
      const shopOrder = assignment.order?.shopOrders?.find(
        (so) => String(so._id) === String(assignment.shopOrderId)
      );

      return {
        assignmentId: assignment._id,
        orderId: assignment.order?._id,
        shopName: assignment.shop?.shopName,
        deliveryAddress: assignment.order?.deliveryAddress,
        items: shopOrder?.shopOrderItem || [],
        subtotal: shopOrder?.subtotal || 0,
      };
    });

    res.status(200).json({
      message: "Assignments fetched successfully",
      data: format,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error fetching assignments: ${error.message}`,
    });
  }
};

export const getDeliveryAssignmentByIdController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { assignmentId } = req.params;
    const deliveryBoyId = req.user.id;

    const assignment = await DeliveryAssignmentModel.findOne({
      _id: assignmentId,
      status: "brodcasted",
      brodcastedTo: deliveryBoyId,
    }).session(session);

    if (!assignment) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Assignment not found or not allowed",
      });
    }

    const alreadyAssigned = await DeliveryAssignmentModel.findOne({
      assignedTo: req.user.id,
      status: { $in: ["brodcasted", "completed"] },
    }).session(session);

    if (alreadyAssigned) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "you are already assigned to another order",
      });
    }

    assignment.assignedTo = deliveryBoyId;
    assignment.status = "assigned";
    assignment.acceptedAt = new Date();
    await assignment.save({ session });

    const order = await orderModel.findById(assignment.order).session(session);

    if (!order) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "order not found",
      });
    }

    const shopOrder = await order.shopOrders.id(assignment.shopOrderId);

    if (!shopOrder) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Shop order not found",
      });
    }

    shopOrder.assignedDeliveryBoy = deliveryBoyId;
    shopOrder.assignment = assignment._id;
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Assignment accepted successfully",
      assignmentId: assignment._id,
      orderId: order._id,
      shopOrderId: shopOrder._id,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      message: `Error accepting assignment: ${error.message}`,
    });
  }
};
