import userModel from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import debug from "debug";
const debuglog = debug("development:controllerauth")

export const RegisterApi = async (req, res) => {
  try {
    const { email, password, fullname, role, contact } = req.body;

    const isUserExitest = await userModel.findOne({
      $or: [{ fullname }, { email }, {role}, {contact}],
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

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {expiresIn: "7d"});
    res.cookie("token", token, {
      maxAge: 7*24*60*24*1000,
      httpOnly: true,
    });

    res.status(201).json({
      message: "register successfully",
      user,
      token,
    });
  } catch (error) {
    debuglog(error)
    console.error(error)
    res.status(500).json({
      message: "internal server error, please try again later",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "successfully user login"
    })
  } catch (error) {
    debuglog(error)
    res.status(500).json({
      message: "internal server error, please try again later",
    });
  }
};
