import MongoShopRepository from "../respositories/implementations/mongoShopRepository.js";

class shopServices {
    constructor () {
        this.shopRepository = new MongoShopRepository();
    }

    async allShopReadPublic() {
        const shops = await this.shopRepository.allShopReadPublic();

        return shops;
    }
}

export default shopServices;