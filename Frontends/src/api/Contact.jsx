import instance from "../utils/axios"

export const sendMessage = (data) => {
    return instance.post("/contact/message", data, {
        withCredentials: true
    })
}