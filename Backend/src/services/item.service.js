import mongoItemRepository from "../respositories/implementations/mongoItemRepository.js";

class itemService {
    constructor () {
        this.mongoItemRepository = new mongoItemRepository()
    }

    async allItemReadPublic () {
        const items = await this.mongoItemRepository.allItemReadPublic()

        return items;
    }
}

export default itemService;