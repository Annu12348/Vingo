import userModel from "../models/user.models.js"

export const socketIoHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 Socket connected:", socket.id);
        socket.on("identity", async ({ userId }) => {
            console.log("user id", userId)
            try {
                const user = await userModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id, isOnline: true },
                    { new: true, runValidators: true }
                );
                if (user) {
                    console.log("socketId :", user.socketId, "isOnline :", user.isOnline);
                } else {
                    console.warn(`User with ID ${userId} not found`);
                }
            } catch (error) {
                console.error("❌ identity error:", error);
            }
        })
        socket.on("disconnect", async () => {
            try {
                await userModel.findOneAndUpdate({socketId: socket.id}, {
                    socketId: null,
                    isOnline: false
                })
                if (user) {
                    console.log("socketId :", user?.socketId, "isOnline :", user?.isOnline);
                } else {
                    console.warn(`User with ID ${userId} not found`);
                }
            } catch (error) {
                console.log(SyntaxError)
            }
            
        })
    })
}
    
