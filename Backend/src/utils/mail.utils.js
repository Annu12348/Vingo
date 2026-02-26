import nodemailer from "nodemailer";
import { config } from "../config/config.js";

console.log("EMAIL_USER:", config.EMAIL_USER);
console.log("SMTP_USER:", config.SMTP_USER);
console.log("SMTP_HOST:", config.SMTP_HOST);
console.log("SMTP_PORT:", config.SMTP_PORT ? "OK" : "MISSING");


// Optional: Remove debug logs in production
if (process.env.NODE_ENV !== "production") {
  console.log("EMAIL_USER:", config.EMAIL_USER);
  console.log("SMTP_USER:", config.SMTP_USER);
  console.log("SMTP_HOST:", config.SMTP_HOST);
  console.log("SMTP_PORT:", config.SMTP_PORT ? "OK" : "MISSING");
}

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.log("SMTP ERROR ❌", err);
  else console.log("SMTP READY ✅");
  if (err) {
    console.error("SMTP ERROR ❌", err);
  } else {
    console.log("SMTP READY ✅");
  }
});


export const sendOtpMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Vingo" <${config.EMAIL_USER}>`,
      to,
      subject: "Your Vingo Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    });
  } catch (err) {
    console.error("MAIL ERROR ❌", err.message);
  }
};

export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Vingo" <${config.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Vingo Delivery OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });
  } catch (err) {
    console.error("MAIL ERROR ❌", err.message);
  }
}
