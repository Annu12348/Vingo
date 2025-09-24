import express from "express";
import {
  loginUser,
  RegisterApi,
  logoutUser,
  resetController,
  verifyController,
  resetPasswordController,
} from "../controller/auth.controller.js";
import { registerValidator } from "../middleware/validator.middleware.js";
const router = express.Router();

router.post("/register", registerValidator, RegisterApi);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.post("/reset", resetController)
router.post("/verify", verifyController);
router.post("/newpassword", resetPasswordController)

export default router;
