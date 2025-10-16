import express from "express";
import {
  shopCreateController,
  shopfetchedController,
  shopUpdatedController,
} from "../controller/shop.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";
import { shopValidator } from "../middleware/shop.validator.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  authenticationMiddleware,
  upload.single("image"),
  shopValidator,
  shopCreateController
);
router.put(
  "/update/:shopId",
  authenticationMiddleware,
  upload.single("image"),
  shopUpdatedController
);
router.get("/fetch", authenticationMiddleware, shopfetchedController);

export default router;
