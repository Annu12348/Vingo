import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    contact: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10,15}$/, "Please provide a valid contact number"],
    },
    password: {
      type: String,
      //required: true,
      trim: true,
      minlength: 6,
    },
    imageUrl: {
      type: String,
      default: "",
    },    
    role: {
      type: String,
      enum: ['owner', 'deliveryBoy', 'user'],
      required: true,
      trim: true
    },
    resetOtp: {
      type: String,
      default: ""
    },
    otpVerify: {
      type: Boolean,
      default: false
    },
    otpExpires: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
