import mongoose from "mongoose";

const shopItemOrderSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const shopOrderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subtotal: {
      type: Number,
    },
    shopOrderItem: [shopItemOrderSchema],

    status: {
      type: String,
      enum: ["pending", "accepted", "preparing", "delivered", "cancelled"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

const orderSehema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
    },
    deliveryAddress: {
      text: String,
      latitude: Number,
      longitude: Number,
    },
    totalAmount: {
      type: Number,
    },

    shopOrders: [shopOrderSchema],
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSehema);
export default orderModel;
