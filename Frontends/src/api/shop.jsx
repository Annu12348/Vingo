import instance from "../utils/axios"

export const allShopReadPublic = () => {
     return instance.get("/shop/shops", {
        withCredentials: true
    })
}