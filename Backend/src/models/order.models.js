import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paymentAddress: {
        
    }
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;

//user, paymentMethod, deliveryAddress=>text,latitude,longitude, totalAmount, shopOder
//shopOderSchema=shop, owner, subtotal, shopOrderItems
//item,price,quantityj