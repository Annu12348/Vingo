import itemModel from "../../models/item.models.js";
import AppError from "../../utils/error.js";
import IItemRepository from "../contracts/IItemRepository.js";

class mongoItemRepository extends IItemRepository {
    async allItemReadPublic () {
        try {
            const items = await itemModel.find()
            .populate("shop", "shopName address")
            return items;
        } catch (error) {
            throw new AppError(`Failed to all item read: ${error.message}`, 500, error)
        }
    } 
}

export default mongoItemRepository;

/*
const searchData = async (req, res) => {
  try {
    const query = req.query.q;

    const foods = await Item.find({
      foodName: { $regex: query, $options: "i" },
    }).select("foodName image price");

    const restaurants = await Shop.find({
      shopName: { $regex: query, $options: "i" },
    }).select("shopName image address");

    res.status(200).json({
      success: true,
      foods,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search error",
    });
  }
};

router.get("/search", searchData);
*/