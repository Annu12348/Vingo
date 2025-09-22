import express from "express";
import {
  loginUser,
  RegisterApi,
  logoutUser,
  resetOtpController,
  verifyOtpController,
} from "../controller/auth.controller.js";
import { registerValidator } from "../middleware/validator.middleware.js";
const router = express.Router();

router.post("/register", registerValidator, RegisterApi);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.get("/reset", resetOtpController);
router.get("/verify", verifyOtpController);

export default router;
