import shopModel from "../../models/shop.models.js";
import AppError from "../../utils/error.js";
import IShopRepository from "../contracts/IShopRepository.js";

class MongoShopRepository extends IShopRepository {
    async allShopReadPublic () {
        try {
            const shops = await shopModel.find({
                isOpen: true,//shop ko block and unblock karne ke liye use hota hai
                isActive: true
            }).populate("owner", "fullname email role")

            return shops;
        } catch (error) {
            throw new AppError(`Failed to all shop read: ${error.message}`, 500, error)
        }
    }
}

export default MongoShopRepository;
