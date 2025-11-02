import itemModel from "../models/item.models.js";
import shopModel from "../models/shop.models.js";
import { Imagekit, uploadImages } from "../services/storage.service.js";

export const itemCreateController = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        message: "userId are required",
      });
    }

    const shops = await shopModel.findOne({ owner: userId });
    if (!shops) {
      return res.status(404).json({
        message: "shop not found",
      });
    }

    const shop = shops._id;
    if (!shop) {
      return res.status(400).json({
        message: "userId are required",
      });
    }

    const { foodName, price, category, foodType } = req.body;
    if (!foodName || !price || !category || !foodType) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "no file uploaded",
      });
    }
    const imagefile = await uploadImages(
      req.file.buffer,
      req.file.originalname
    );
    const image = imagefile.url;
    const item = await itemModel.create({
      foodName,
      price,
      category,
      foodType,
      image: image,
      shop,
    });

    res.status(201).json({
      message: "Item created successfully",
      item: {
        id: item._id,
        foodName: item.foodName,
        price: item.price,
        foodType: item.foodType,
        shop: item.shop,
        category: item.category,
        image: item.image,
        imageId: item.imageId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const itemUpdatedController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    if (!userId || !itemId) {
      return res.status(400).json({
        message: "userId and itemId are required",
      });
    }

    const shops = await shopModel.findOne({ owner: userId });
    if (!shops) {
      return res.status(404).json({
        message: "shop not found",
      });
    }

    const shopId = shops._id;
    if (!shopId) {
      return res.status(400).json({
        message: "shop are required",
      });
    }

    const itemExists = await itemModel.findOne({ shop: shopId, _id: itemId });
    if (!itemExists) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const items = await itemModel.findOne({ shop: shopId, _id: itemId });
    if (!items) {
      return res.status(400).json({
        message: "item not found",
      });
    }

    if (items.shop.toString() !== shopId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this item",
      });
    }

    const { foodName, price, category, foodType } = req.body;
    if (!foodName || !price || !category || !foodType) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "no images uploaded",
      });
    }

    const imagefile = await uploadImages(
      req.file.buffer,
      req.file.originalname
    );
    const image = imagefile.url;

    const fileId = imagefile.fileId;
    if (items.fileId) {
      try {
        await Imagekit.deleteFile(items.fileId);
      } catch (error) {
        console.error("Old video delete failed:", error.message);
      }
    }

    const item = await itemModel.findOneAndUpdate(
      { _id: itemId },
      {
        foodName,
        price,
        category,
        foodType,
        imageId: fileId,
        image,
        shop: shopId,
      },
      { new: true }
    );

    res.status(200).json({
      message: "hello world",
      item: {
        id: item._id,
        foodName: item.name,
        price: item.price,
        foodType: item.foodType,
        shop: item.shop,
        category: item.category,
        image: item.image,
        imageId: item.imageId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const itemFetchController = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User ID not found",
      });
    }

    const shop = await shopModel.findOne({ owner: userId });
    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const shopId = shop._id;
    if (!shopId) {
      return res.status(404).json({
        message: "Shop ID not found",
      });
    }

    const { page = 1, limit = 10 } = req.query;

    const item = await itemModel
      .find({ shop: shopId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!item || item.length === 0) {
      return res.status(404).json({
        message: "No items found for this shop.",
      });
    }

    res.status(200).json({
      message: "Items fetched successfully",
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const itemFetchByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const {itemId} = req.params;

    if (!userId || !itemId) {
      return res.status(400).json({
        message: "User ID and item ID are required fields."
      });
    }

    const shop = await shopModel.findOne({ owner: userId });
    if (!shop || !shop._id) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const shopId = shop._id;
    
    const item = await itemModel.findOne({shop: shopId, _id: itemId})
    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.status(200).json({
      message: "Item fetched by id",
      item
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const itemDeletedController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const shop = await shopModel.findOne({ owner: userId });
    if (!shop || !shop._id) {
      return res.status(404).json({
        message: "Shop not found or shopId is missing.",
      });
    }
    const shopId = shop._id;

    const itemExists = await itemModel.findOne({ shop: shopId, _id: itemId });
    if (!itemExists) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const item = await itemModel.findOneAndDelete({
      shop: shopId,
      _id: itemId,
    });
    if (!item) {
      return res.status(404).json({
        message: "Item not found or already deleted.",
      });
    }

    res.status(200).json({
      message: "item deleted",
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const itemFetchedByCityController = async (req, res) => {
  try {
    res.status(200).json({
      message: "hello world"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
}