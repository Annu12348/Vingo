import shopModel from "../models/shop.models.js";
import { Imagekit, uploadImages } from "../services/storage.service.js";

export const shopCreateController = async (req, res) => {
  try {
    const { shopName, state, city, address } = req.body;
    const owner = req.id;
    if (!shopName || !owner || !state || !city || !address) {
      return res.status(400).json({
        message: "All fields are required.",
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

    const shop = await shopModel.create({
      shopName,
      city,
      state,
      address,
      image: image,
      owner,
    });

    res.status(201).json({
      message: "Shop created successfully",
      shop: {
        shopName: shop.shopName,
        image: shop.image,
        owner: shop.owner,
        state: shop.state,
        city: shop.city,
        address: shop.address,
        id: shop._id,
        fileId: shop.fileId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const shopUpdatedController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const userId = req.user.id;

    if (!shopId || !userId) {
      return res.status(400).json({
        message: "Owner and shopId are required",
      });
    }

    const shops = await shopModel.findOne({ owner: userId, _id: shopId });
    if (!shops) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const { shopName, city, state, address } = req.body;

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

    if (shops.fileId) {
      try {
        await Imagekit.deleteFile(shops.fileId);
      } catch (error) {
        console.error("Old video delete failed:", error.message);
      }
    }

    const shop = await shopModel.findOneAndUpdate(
      { owner: userId, _id: shopId },
      { shopName, city, state, address, image, fileId },
      { new: true }
    );

    res.status(200).json({
      message: "Shop updated successfully",
      shop: {
        shopName: shop.shopName,
        image: shop.image,
        owner: shop.owner,
        state: shop.state,
        city: shop.city,
        address: shop.address,
        id: shop._id,
        fileId: shop.fileId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const shopfetchedController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    const { page = 1, limit = 10 } = req.query;

    const shop = await shopModel
      .find({ owner: userId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!shop) {
      return res.status(404).json({
        message: "No shop found",
      });
    }

    res.status(200).json({
      message: "Shops fetched successfully",
      shop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const shopByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopId } = req.params;

    if (!userId || !shopId) {
      return res.status(400).json({
        message: "userId and shopId are required fields",
      });
    }

    const shop = await shopModel.findOne({ owner: userId, _id: shopId });
    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    res.status(200).json({
      message: "Shop fetched by ID",
      shop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const shopDeleteController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopId } = req.params;

    if (!shopId || !userId) {
      return res.status(400).json({
        message: "Owner and shopId are required",
      });
    }

    const shops = await shopModel.findOne({ owner: userId, _id: shopId });
    if (!shops) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const shop = await shopModel.findOneAndDelete({
      owner: userId,
      _id: shopId,
    });
    if (!shop) {
      return res.status(500).json({
        message: "Failed to delete shop",
      });
    }

    res.status(200).json({
      message: "Shop deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};

export const shopfetchCityController = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({
        message: "User ID and city are required",
      });
    }

    // City case-insensitive search
    const shops = await shopModel.find({
      city: { $regex: `^${city}$`, $options: 'i' }, // i = case-insensitive
    });

    if (!shops || shops.length === 0) {
      return res.status(404).json({
        message: "Shops not found"
      });
    }

    res.status(200).json({
      message: "Shop city fetched successfully",
      shops,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, please try again later",
    });
  }
};
