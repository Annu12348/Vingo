import mongoose from "mongoose"

const shopItemOrderSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }
}, {timestamps: true})

const shopOrderSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subTotal: {
        type: Number
    },
    shopItem: [shopItemOrderSchema]
}, {timestamps: true})

const orderSehema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paymentMethod: {
        type: String,
        enum: ["case payment", "online payment"]
    },
    deliveryAddress: {
        text: String,
        latitude: Number,
        longitude: Number,
    },
    totalAmount: {
        type: Number,
    },
    shopOder: [shopOrderSchema]
}, {timestamps: true})

const orderModel = mongoose.model("order", orderSehema);
export default orderModel;