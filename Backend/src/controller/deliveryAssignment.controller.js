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

    const format = assignments.map((assignment) => ({
      assimentId: assignment._id,
      orderId: assignment.order?._id,
      shopName: assignment.shop.shopName,
      deliveryAddress: assignment.order.deliveryAddress,
      items:
        assignment.order?.shopOrders?.find(
          (so) => String(so._id) === String(assignment.shopOrderId)
        ).shopOrderItem || [],
      subtotal: assignment.order?.shopOrders?.find(
        (so) => String(so._id) === String(assignment.shopOrderId)
      ).subtotal,
    }));

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
  try {
    const { assignmentId } = req.params
    
    const assignment = await DeliveryAssignmentModel.find(assignmentId);

    if(!assignment) {
      return res.status(404).json({
        message: "assignment not found"
      })
    }

    if (assignment.status !== "brodcasted") {
      return res.status(400).json({
        message: "Assignment must be in 'brodcasted' status"
      });
    }

    const deliveryAssignments = await DeliveryAssignmentModel.find({
      assignedTo: req.user.id,
      status: {$nin: [["brodcasted", "completed"]]}
    })

    assignment.assignedTo = req.user.id
    assignment.status = 'assigned'
    assignment.acceptedAt = new Date()
    await assignment.save()

    const order = await orderModel.findById(assignment.order);

    if (!order) {
      return res.status(404).json({
        message: "order not found"
      })
    }

    const shopOrder = await order.shopOrders.id(shopOrdersId._id == assignment.shopOrderId)
    shopOrder.assignedDeliveryBoy = req.user.id;
    await order.save()

    res.status(200).json({
      message: "Assignment by ID fetched successfully",
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: `Error fetching assignments: ${error.message}`,
    });
  }
};
