import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: config.EMAIL_USER, 
      to, 
      subject: "Hello", 
      text: "Hello world?", 
      html: "<b>Hello world?</b>", 
    });
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};
