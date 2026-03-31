import mongoItemRepository from "../respositories/implementations/mongoItemRepository.js";

class itemService {
    constructor () {
        this.mongoItemRepository = new mongoItemRepository()
    }

    async allItemReadPublic () {
        const items = await this.mongoItemRepository.allItemReadPublic()

        return items;
    }

    async shopByItemFetch (shopId) {
        const shop = await this.mongoItemRepository.shopByItemFetch(shopId);

        return shop;
    }
}

export default itemService;