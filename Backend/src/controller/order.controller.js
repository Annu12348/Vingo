import { config } from "../config/config.js";
import DeliveryAssignmentModel from "../models/deliveryAssignment.model.js";
import orderModel from "../models/order.models.js";
import shopModel from "../models/shop.models.js";
import userModel from "../models/user.models.js";
import { sendDeliveryOtpMail } from "../utils/mail.utils.js";
import Razorpay from 'razorpay';

let razorpayInstance = new Razorpay({
  key_id: config.REZORPAY_API_KEY_ID,
  key_secret: config.REZORPAY_API_SECRET_KEY,
});

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
      !deliveryAddress ||
      !deliveryAddress.text ||
      deliveryAddress.latitude === undefined ||
      deliveryAddress.longitude === undefined
    ) {
      return res.status(400).json({
        message: "complete deliveryAddress required",
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
          throw new Error(`Shop not found: ${shopId}`);
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

    if (paymentMethod == "online") {
      const rezorOrder = await razorpayInstance.orders.create({
        amount: Math.round(totalAmount * 100),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      });

      const newOrder = await orderModel.create({
        user: req.user._id,
        deliveryAddress,
        totalAmount,
        cartItems,
        shopOrders,
        paymentMethod,
        rezorpayOrderId: rezorOrder.id,
        payments: false
      });

      return res.status(200).json({
        rezorOrder,
        orderId: newOrder._id,
        key_id: config.REZORPAY_API_KEY_ID,
      })
    }

    const newOrder = await orderModel.create({
      user: req.user._id,
      deliveryAddress,
      totalAmount,
      cartItems,
      shopOrders,
      paymentMethod,
    });

    await newOrder.populate("shopOrders.shopOrderItem.item", "foodName image price")
    await newOrder.populate("shopOrders.shop", "shopName")
    await newOrder.populate("shopOrders.owner", "fullname socketId")
    await newOrder.populate("user", "fullName email contact ")

    const io = req.app.get('io')

    if (io) {
      newOrder.shopOrders.forEach(shopOrder => {
        const ownerSocketId = shopOrder.owner.socketId
        console.log("ownerSocket :", ownerSocketId)

        if (ownerSocketId) {
          io.to(ownerSocketId).emit('newOrder', {
            _id: newOrder._id,
            paymentMethod: newOrder.paymentMethod,
            user: newOrder.user,
            createdAt: newOrder.createdAt,
            shopOrders: [shopOrder],
            deliveryAddress: newOrder.deliveryAddress,
            status: newOrder.status,
            payments: newOrder.payments
          })
        }
      })
    }

    res.status(201).json({
      message: "new order successfully created",
      newOrder,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
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
      .populate("shopOrders.shopOrderItem.item", "name image price")
      .populate("shopOrders.assignedDeliveryBoy", "fullname contact")

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
      payments: order.payments
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
    const userId = req.user.id;

    const allowStatus = [
      "pending",
      "preparing",
      "delivered",
      "out of delivery",
    ];

    if (!orderId || !shopId || !userId) {
      return res.status(400).json({
        message: "orderId, userId and shopId are required fields.",
      });
    }

    if (!status || !allowStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "order not founds.",
      });
    }

    const shopOrder = await order.shopOrders.find(
      (orders) =>
        orders.shop.toString() === shopId && orders.owner.toString() === userId
    );

    if (!shopOrder) {
      return res.status(403).json({
        message: "You are not authorized to update this shop order",
      });
    }

    shopOrder.status = status;
    order.markModified(shopOrder);

    let deliveryBoyPayload = [];

    if (status == "out of delivery" || !shopOrder.assignment) {
      const { longitude, latitude } = order.deliveryAddress;

      const nearByDeliveryBoys = await userModel.find({
        role: "deliveryBoy",
        isOnline: true,
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

      const nearByIds = nearByDeliveryBoys.map((b) => b._id);
      const busyByIds = await DeliveryAssignmentModel.find({
        assignedTo: {
          $in: nearByIds,
        },
        status: {
          $nin: ["brodcasted", "completed"],
        },
      }).distinct("assignedTo");

      const busyIdSet = new Set(busyByIds.map((id) => String(id)));

      const availableBoys = nearByDeliveryBoys.filter(
        (b) => !busyIdSet.has(String(b._id))
      );
      const candidates = availableBoys.map((b) => b._id);

      if (candidates.length == 0) {
        await order.save();
        return res.json({
          message:
            "order status updated but there is no available delivery boy",
        });
      }

      const deliveryAssignment = await DeliveryAssignmentModel.create({
        order: order._id,
        shop: shopOrder.shop,
        shopOrderId: shopOrder._id,
        brodcastedTo: candidates,
        status: "brodcasted",
      });

      shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;
      shopOrder.assignment = deliveryAssignment._id;
      deliveryBoyPayload = availableBoys.map((b) => ({
        id: b._id,
        fullName: b.fullname,
        longitude: b.location.coordinates?.[0],
        latitude: b.location.coordinates?.[1],
        contact: b.contact,
      }));
    }

    const updatedShopOrder = order.shopOrders.find((o) => o.shop == shopId);
    await order.populate("shopOrders.shop", "shopName");
    await order.populate(
      "shopOrders.assignedDeliveryBoy",
      "fullname email contact"
    )
    await order.populate("user", "socketId");

    await order.save();

    const io = req.app.get('io')

    if (io) {
      const userSocketId = order.user.socketId;
      if (userSocketId) {
        io.to(userSocketId).emit('update-status', {
          orderId: order._id,
          shopId: updatedShopOrder.shop._id,
          status: updatedShopOrder.status,
          userId: order.user._id
        })
      }
    }

    res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
      availableBoys: deliveryBoyPayload,
      assignment: updatedShopOrder?.assignment._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Updated Status Error: ${error.message}`,
    });
  }
};

export const getOrderByid = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId)
      .populate("user")
      .populate({
        path: "shopOrders.shop",
        model: "Shop"
      })
      .populate({
        path: "shopOrders.assignedDeliveryBoy",
        model: "User"
      })
      .populate({
        path: "shopOrders.shopOrderItem.item",
        model: "Item"
      })
      .lean()

    if (!order) {
      return res.status(404).json({
        message: "order not found",
      })
    }

    res.status(200).json({
      message: "Order fetched by id successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error accepting assignment: ${error.message}`,
    });
  }
}

export const sendDeliveryOtpController = async (req, res) => {
  try {
    const { orderId, shopOrderId } = req.body;
    const order = await orderModel.findById(orderId).populate("user")

    const shopOrder = order.shopOrders.id(shopOrderId)

    if (!order || !shopOrder) {
      return res.status(400).json({
        message: "Is valid order/shopOrderId"
      })
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    shopOrder.deliveryOtp = otp;
    shopOrder.otpExpires = Date.now() + 5 * 60 * 1000
    await order.save()

    await sendDeliveryOtpMail(order.user, otp)

    res.status(200).json({
      message: `Delivery OTP sent successfully ${order.user.fullname}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Delivery otp Error: ${error.message}`,
    });
  }
}

export const verifyOtpController = async (req, res) => {
  try {
    const { orderId, shopOrderId, otp } = req.body

    const order = await orderModel.findById(orderId).populate("user")

    const shopOrder = order.shopOrders.id(shopOrderId)

    if (!order || !shopOrder) {
      return res.status(400).json({
        message: "Is valid order/shopOrderId"
      })
    }

    if (shopOrder.deliveryOtp !== otp || !shopOrder.otpExpires || shopOrder.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "Invalid/Expired Otp"
      })
    }

    shopOrder.status = "delivered"
    shopOrder.deliveredAt = Date.now()
    await order.save()

    const delivered = await DeliveryAssignmentModel.deleteOne({
      shopOrderId,
      order: orderId,
      assignedTo: shopOrder.assignedDeliveryBoy
    })
    res.status(200).json({
      message: "order delivered successfullyj"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Verify otp Error: ${error.message}`,
    });
  }
}

export const verifyPaymentController = async (req, res) => {
  try {
    const { rezor_payment_id, orderId } = req.body;

    if (!rezor_payment_id || !orderId) {
      return res.status(400).json({
        success: false,
        message: "rezor_payment_id and orderId are feild required"
      })
    }

    const payment = await razorpayInstance.payments.fetch(rezor_payment_id);

    if (!payment || payment.status !== "captured") {
      return res.status(401).json({
        success: false,
        message: "Payment was not successful or not captured."
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found"
      })
    }

    order.payments = true;
    order.rezorPaymentId = rezor_payment_id
    await order.save()

    await order.populate("shopOrders.shopOrderItem.item", "foodName image price")
    await order.populate("shopOrders.shop", "shopName")
    await order.populate("shopOrders.owner", "fullname socketId")
    await order.populate("user", "fullName email contact ")

    const io = req.app.get('io')

    if (io) {
      order.shopOrders.forEach(shopOrder => {
        const ownerSocketId = shopOrder.owner.socketId
        console.log("ownerSocket :", ownerSocketId)

        if (ownerSocketId) {
          io.to(ownerSocketId).emit('newOrder', {
            _id: order._id,
            paymentMethod: order.paymentMethod,
            user: order.user,
            createdAt: order.createdAt,
            shopOrders: [shopOrder],
            deliveryAddress: order.deliveryAddress,
            status: order.status,
            payments: order.payments
          })
        }
      })
    }

    res.status(200).json({
      message: "razor payment success fully verify",
      data: order
    })
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: `verify payment error ${error}`,
    });
  }
}
