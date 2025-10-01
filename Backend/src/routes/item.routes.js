import express from "express";
import {
  itemCreateController,
  itemUpdatedController,
} from "../controller/item.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  authenticationMiddleware,
  upload.single("image"),
  itemCreateController
);

router.put(
  "/update/:itemId",
  authenticationMiddleware,
  upload.single("image"),
  itemUpdatedController
);

export default router;
