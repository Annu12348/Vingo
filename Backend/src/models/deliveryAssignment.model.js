import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    shopOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopOrder",
      required: true,
    },
    brodcastedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["brodcasted", "assigned", "completed"],
      default: "brodcasted",
    },

    acceptedAt: Date,
  },
  {
    timestamps: true,
  }
);

const DeliveryAssignmentModel = mongoose.model(
  "DeliveryAssignment",
  deliveryAssignmentSchema
);
export default DeliveryAssignmentModel;

{
  /*enum: [
        "brodcasted", // multiple delivery boys ko offer gaya
        "assigned", // ek delivery boy ne accept kiya
        "picked", // order pickup ho gaya
        "on_the_way", // delivery boy raste me hai
        "delivered", // order delivered
        "completed", // payment + flow complete
        "cancelled", // order cancel ho gaya
        "rejected", // delivery boy ne reject kiya
        "expired",
      ],*/
}
