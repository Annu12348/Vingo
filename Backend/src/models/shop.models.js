import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    
    image: {
      type: String,
      required: true,
    },

    fileId: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    deliveryTime: {
      type: String,
      default: "30-40 min",
    },

    minOrderAmount: {
      type: Number,
      default: 100,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    category: {
      type: String,
      required: true,
      enum: [ 
        "North Indian",
        "South Indian",
        "Chinese",
        "Fast Food",
        "Street Food",
        "Pizza",
        "Burger",
        "Biryani",
        "Cafe",
        "Bakery",
        "Desserts",
        "Beverages",
        "Pure Veg",
        "Non Veg",
        "Multi Cuisine"
      ],
    },

    closeTime: {
      type: String,
      default: "10:00 PM"
    }
  },
  {
    timestamps: true,
  }
);

const shopModel = mongoose.model("Shop", shopSchema);
export default shopModel;
