import express from "express";
import { loginUser, RegisterApi } from "../controller/auth.controller.js";
import { registerValidator } from "../middleware/validator.middleware.js";
const router = express.Router();

router.post("/register", registerValidator, RegisterApi)
router.post("/login", loginUser)

export default router;