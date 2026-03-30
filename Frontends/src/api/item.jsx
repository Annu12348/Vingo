import instance from "../utils/axios"

export const singleShopFetchAllItem = (detailsId) => {
    return instance.get(`/item/shop/${detailsId}`, {
        withCredentials: true
    });
}

export const allItemPublic = () => {
    return instance.get("/item/item-public", {
        withCredentials: true
    })
}