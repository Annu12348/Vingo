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
  IMAGEKIT_ENDPOINT_URL: process.env.IMAGEKIT_ENDPOINT_URL
};
