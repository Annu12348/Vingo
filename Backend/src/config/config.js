import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGODB_URL: process.env.MONGODB_URL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  PORT: process.env.PORT,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_ENDPOINT_URL: process.env.IMAGEKIT_ENDPOINT_URL,

  REZORPAY_API_KEY_ID: process.env.REZORPAY_API_KEY_ID,
  REZORPAY_API_SECRET_KEY: process.env.REZORPAY_API_SECRET_KEY,

  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  GOOGLE_CALLBACK_URL: process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_CALLBACK_LIVE_URL
    : process.env.GOOGLE_CALLBACK_URL,
  GOOGLE_LOGIN_CALLBACK_URL: process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_LOGIN_CALLBACK_LIVE_URL
    : process.env.GOOGLE_LOGIN_CALLBACK_URL,

  FRONTEND_URL: process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_LIVE_URL
    : process.env.FRONTEND_URL,
};
