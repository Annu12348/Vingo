import nodemailer from "nodemailer";
import { config } from "../config/config.js";

console.log("EMAIL_USER:", config.EMAIL_USER);
console.log("MONGODB_URL:", config.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
  connectionTimeout: 20000,
});

transporter.verify((err, success) => {
  if (err) console.log("SMTP ERROR", err);
  else console.log("SMTP READY");
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
