import express from "express";
import {
  shopCreateController,
  shopUpdatedController,
} from "../controller/shop.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  authenticationMiddleware,
  upload.single("image"),
  shopCreateController
);
router.put(
  "/update/:shopId",
  authenticationMiddleware,
  upload.single("image"),
  shopUpdatedController
);

export default router;
