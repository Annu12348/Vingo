import nodemailer from "nodemailer";
import { config } from "../config/config.js";

// ✅ Transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

// ✅ Verify SMTP connection (server start pe call karo)
export const verifyMailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Brevo SMTP Connected");
  } catch (error) {
    console.error("❌ Brevo SMTP Error:", error.message);
  }
};

// ✅ Common mail sender
const sendMail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: config.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    console.log("📩 Mail sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Mail send error:", error.message);
    return false;
  }
};



// ==============================
// 🔐 PASSWORD RESET OTP
// ==============================
export const sendOtpMail = async (to, otp) => {
  return await sendMail({
    to,
    subject: "Your Vingo Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in <b>5 minutes</b>.</p>
    `,
  });
};



// ==============================
// 🚚 DELIVERY OTP
// ==============================
export const sendDeliveryOtpMail = async (user, otp) => {
  return await sendMail({
    to: user.email,
    subject: "Your Vingo Delivery OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    html: `
      <h2>Delivery OTP</h2>
      <p>Hello ${user.name || "User"},</p>
      <p>Your delivery OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in <b>5 minutes</b>.</p>
    `,
  });
};