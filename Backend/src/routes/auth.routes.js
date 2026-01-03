import express from "express";
import {
  loginUser,
  RegisterApi,
  logoutUser,
  resetController,
  verifyController,
  resetPasswordController,
  googleAuthController,
  googleAuthLoginController,
  updatedController,
  protectedRoutesController,
  updateUserLocationController,
} from "../controller/auth.controller.js";
import { registerValidator } from "../middleware/validator.middleware.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerValidator, RegisterApi);
router.post("/login", loginUser);
router.put("/update/:id", updatedController);
router.delete("/logout", authenticationMiddleware, logoutUser);
router.post("/reset", resetController);
router.post("/verify", verifyController);
router.post("/newpassword", resetPasswordController);
router.post("/google", googleAuthController);
router.post("/googlelogin", googleAuthLoginController);
router.get("/me", protectedRoutesController);

router.put(
  "/update-location",
  authenticationMiddleware,
  updateUserLocationController,
  updateUserLocationController
);

export default router;
