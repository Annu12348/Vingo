class IItemRepository {
    async allItemReadPublic () {
        throw new Error("Method not implement")
    }

    async shopByItemFetch (shopId) {
        throw new Error("method not implement")
    }
}

export default IItemRepository;