import DeliveryAssignmentModel from "../models/deliveryAssignment.model.js";
import orderModel from "../models/order.models.js";
import shopModel from "../models/shop.models.js";
import userModel from "../models/user.models.js";

export const placeOrderController = async (req, res) => {
  try {
    const { paymentMethod, deliveryAddress, totalAmount, cartItems } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({
        message: "paymentMethod are required",
      });
    }

    if (!totalAmount) {
      return res.status(400).json({
        message: "totalAmount are required",
      });
    }

    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({
        message: "send complete deliveryAddress",
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "cartItems required" });
    }

    const groupItemByShop = {};

    cartItems.forEach((items) => {
      const shopId = items.shop;
      if (!groupItemByShop[shopId]) {
        groupItemByShop[shopId] = [];
      }
      groupItemByShop[shopId].push(items);
    });

    const shopOrders = await Promise.all(
      Object.keys(groupItemByShop).map(async (shopId) => {
        const shop = await shopModel.findById(shopId).populate("owner");

        if (!shop) {
          return res.status(404).json({
            message: "shop not found",
          });
        }

        const item = groupItemByShop[shopId];
        const subtotal = item.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0
        );
        return {
          shop: shopId,
          owner: shop.owner._id,
          subtotal,
          shopOrderItem: item.map((i) => ({
            item: i.id,
            price: i.price,
            quantity: i.quantity,
            name: i.foodName,
          })),
        };
      })
    );

    const newOrder = await orderModel.create({
      user: req.user._id,
      deliveryAddress,
      totalAmount,
      cartItems,
      shopOrders,
      paymentMethod,
    });

    res.status(201).json({
      message: "new order successfully created",
      newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: `place order error ${error}`,
    });
  }
};

export const getUserOrderController = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Access denied: user only",
      });
    }

    const orders = await orderModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("shopOrders.shop", "shopName image")
      .populate("shopOrders.owner", "email contact fullname role")
      .populate("shopOrders.shopOrderItem.item", "foodName image price");

    res.status(200).json({
      message: "user order successfully fetched data",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: `get user order ${error}`,
    });
  }
};

export const getOwnerOrderController = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        message: "Access denied: Shop Owners only",
      });
    }

    const orders = await orderModel
      .find({ "shopOrders.owner": req.user._id.toString() })
      .sort({ createdAt: -1 })
      .populate("shopOrders.shop", "shopName image")
      .populate("user")
      .populate("shopOrders.shopOrderItem.item", "name image price");

    const filteredOrders = orders.map((order) => ({
      _id: order._id,
      paymentMethod: order.paymentMethod,
      user: order.user,
      createdAt: order.createdAt,
      shopOrders: order.shopOrders.filter(
        (shopOrder) =>
          shopOrder.owner &&
          shopOrder.owner._id.toString() === req.user._id.toString()
      ),
      deliveryAddress: order.deliveryAddress,
      status: order.status,
    }));

    res.status(200).json({
      message: "owner order successfully fetched data",
      filteredOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: `get user order ${error}`,
    });
  }
};

export const statusChangesController = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;
    const userId = req.user.id; // Ensure string and fallback for id

    const allowedStatus = [
      "pending",
      "preparing",
      "delivered",
      "out of delivery",
    ];

    if (!orderId || !shopId || !userId) {
      return res.status(400).json({
        message: "orderId, userId, and shopId are required fields.",
      });
    }

    if (!status || !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "order not found.",
      });
    }

    const shopOrder = order.shopOrders.find(
      (o) =>
        o.shop.toString() === shopId &&
        o.owner &&
        o.owner.toString() === userId
    );

    if (!shopOrder) {
      return res.status(403).json({
        message: "You are not authorized to update this shop order.",
      });
    }

    shopOrder.status = status;
    order.markModified("shopOrders");

    let deliveryBoyPayload = [];
    let condidates = [];
    let availableBoy = [];

    if (status === "out of delivery" && !shopOrder.assignment) {
      const { latitude, longitude } = order.deliveryAddress || {};
      if (
        typeof latitude !== "undefined" &&
        typeof longitude !== "undefined"
      ) {
        const nearByDeliveryBoy = await userModel.find({
          role: "deliveryBoy",
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [Number(longitude), Number(latitude)],
              },
              $maxDistance: 5000,
            },
          },
        });

        const nearByIds = nearByDeliveryBoy.map((d) => d._id);
        const busyByIds = await DeliveryAssignmentModel.find({
          assignedTo: { $in: nearByIds },
          status: { $nin: ["broadcasted", "completed"] },
        }).distinct("assignedTo");

        const busyByIdSet = new Set(
          busyByIds.map((deliveryBoy) => String(deliveryBoy))
        );
        availableBoy = nearByDeliveryBoy.filter(
          (deliveryBoy) => !busyByIdSet.has(String(deliveryBoy._id))
        );
        condidates = availableBoy.map((deliveryBoy) => deliveryBoy._id);

        if (condidates.length === 0) {
          await order.save();
          return res.json({
            message:
              "order status updated but there is no available delivery boys",
          });
        }

        const deliveryAssignment = await DeliveryAssignmentModel.create({
          order: order._id,
          shop: shopOrder.shop,
          shopOrderId: shopOrder._id,
          broadcastedTo: condidates,
          status: "broadcasted",
        });

        shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;
        shopOrder.assignment = deliveryAssignment._id;

        deliveryBoyPayload = availableBoy.map((b) => ({
          id: b._id,
          fullName: b.fullname,
          longitude: b.location.coordinates[0],
          latitude: b.location.coordinates[1],
          mobile: b.mobile,
        }));
      }
    }

    await order.save();

    const updatedShopOrder = order.shopOrders.find(
      (o) => o.shop.toString() === shopId && o.owner.toString() === userId
    );
    await order.populate("shopOrders.shop", "name");
    await order.populate("shopOrders.assignedDeliveryBoy", "name");

    res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
      availableBoy: deliveryBoyPayload,
      assignment: updatedShopOrder?.assignment?._id ?? null,
    });
  } catch (error) {
    res.status(500).json({
      message: `Updated Status Error: ${error.message}`,
    });
  }
};
//1 hourse completed
