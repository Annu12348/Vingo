import instance from "../utils/axios"

export const logoutApi = async () => {
    return instance.delete("/auth/logout", {
        withCredentials: true
    })
}