import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      default: "",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others",
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
      enum: ["Veg", "Non-Veg", "Vegan"],
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0, 
      }
    }
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("item", itemSchema);
export default itemModel;
