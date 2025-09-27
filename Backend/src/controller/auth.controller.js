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
      return res.status(409).json({
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      message: "successfully user registered",
      user: {
        id: user._id,
        FullName: user.fullname,
        email: user.email,
        contact: user.contact,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
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
      user: {
        id: user._id,
        FullName: user.fullname,
        email: user.email,
        contact: user.contact,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
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
      message: "Logout successfully",
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
    });
  }
};

export const resetController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.otpVerify = false;

    await user.save();
    await sendOtpMail(email, otp);

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
      user,
    });
  }
};

export const verifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.resetOtp !== otp) {
      return res.status(404).json({
        message: "Invalid OTP",
      });
    }
    user.resetOtp = undefined;

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }
    user.otpExpires = undefined;
    user.otpVerify = true;
    await user.save();

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.otpVerify) {
      return res.status(400).json({
        message:
          "OTP not verified. Please verify your OTP before resetting password.",
      });
    }
    user.otpVerify = false;

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "reset password",
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
    });
  }
};

export const googleAuthController = async (req, res) => {
  try {
    const { email, contact, role, fullname } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      // Agar email exist karta hai to error bhej do
      return res.status(400).json({
        message: "user already exists; Please login instead.",
      });
    }

    if (!user) {
      user = await userModel.create({
        fullname,
        email,
        contact,
        role,
      });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Google authentication successful",
      user: {
        id: user._id,
        FullName: user.fullname,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token,
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
      error: error.message || error,
    });
  }
};

export const googleAuthLoginController = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(409).json({
        message: "User not found",
      });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Google authentication successful",
      user: {
        id: user._id,
        FullName: user.fullname,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token,
    });
  } catch (error) {
    debuglog(error);
    res.status(500).json({
      message: "Internal server error: please try again later.",
      error: error.message || error,
    });
  }
};
