import express from "express";
import itemController, {
  itemCreateController,
  itemDeletedController,
  itemFetchByIdController,
  itemFetchController,
  itemFetchedByCityController,
  itemUpdatedController,
  searchItemController,
  shopItemFetchController
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

router.get("/fetch",
  authenticationMiddleware,
  itemFetchController
);

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
  itemFetchedByCityController
);

router.get("/shop/:shopId",
  shopItemFetchController
)

router.get("/search-item",
  authenticationMiddleware,
  searchItemController
)

//public
const itemControllers = new itemController()
router.get("/item-public", itemControllers.allItemReadPublic.bind(itemControllers))
router.get("/shops/:shopId", itemControllers.shopByItemFetch.bind(itemControllers))

export default router;
//4:00 to 6:40