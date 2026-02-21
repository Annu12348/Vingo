import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
  connectionTimeout: 10000,
});




export const sendOtpMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: config.EMAIL_USER, 
      to, 
      subject: "Your Vingo Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    });
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    const info = await transporter.sendMail({
      from: config.EMAIL_USER, 
      to: user.email, 
      subject: "Your Vingo Delivery OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    });
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};
