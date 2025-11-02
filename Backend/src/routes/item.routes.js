import express from "express";
import {
  itemCreateController,
  itemDeletedController,
  itemFetchByIdController,
  itemFetchController,
  itemUpdatedController,
} from "../controller/item.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
import multer from "multer";
import { itemValidator } from "../middleware/item.validator.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  authenticationMiddleware,
  upload.single("image"),
  itemValidator,
  itemCreateController
);

router.put(
  "/update/:itemId",
  authenticationMiddleware,
  upload.single("image"),
  itemUpdatedController
);

router.get("/fetch", authenticationMiddleware, itemFetchController);
router.delete(
  "/delete/:itemId",
  authenticationMiddleware,
  itemDeletedController
);

router.get(
  "/fetchBy-Id/:itemId",
  authenticationMiddleware,
  itemFetchByIdController
);

router.get(
  "/fetchByCity-City/:city",
  authenticationMiddleware,
  itemFetchByIdController
);

export default router;
