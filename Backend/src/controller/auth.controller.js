import userModel from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import debug from "debug";
import { sendOtpMail } from "../utils/mail.utils.js";
const debuglog = debug("development:controllerauth");

export const RegisterApi = async (req, res) => {
  try {
    const { email, password, fullname, role, contact } = req.body;

    const isUserExitest = await userModel.findOne({
      $or: [{ fullname }, { email }, { contact }],
    });

    if (isUserExitest) {
      return res.status(404).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      role,
      contact,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 24 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      message: "register successfully",
      user,
      token,
    });
  } catch (error) {
    debuglog(error);
    console.error(error);
    res.status(500).json({
      message: "internal server error, please try again later",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY);
    res.cookie("token", token);

    res.status(200).json({
      message: "successfully user login",
      user,
      token,
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "internal server error, please try again later",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "hello worls",
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
    });
  }
};

export const resetOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const isResetOtp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = isResetOtp;

    const otp = Date.now(5 * 60 * 1000);
    user.otpExpires = otp;

    user.otpVerify = false;

    await user.save();
    await sendOtpMail(email, isResetOtp);

    res.status(200).json({
      message: "OTP sent successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error: please try again later.",
    });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
   
    if(!user){
      return res.status(200).json({
        message: "user not found"
      })
    }

    if(!user.resetOtp !== otp){
      return res.status(200).json({
        message: "invalid otp"
      })
    }

    

    res.status(200).json({
      message: "OTP verified successfully",
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error: please try again later.",
    });
  }
};
