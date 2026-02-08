import userModel from "../models/user.models.js"

export const socketIoHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 Socket connected:", socket.id);

        socket.on("identity", async ({ userId }) => {
            try {
                if (!userId) return;

                socket.userId = userId

                socket.join(userId.toString())

                await userModel.findByIdAndUpdate(
                    userId,
                    {
                        socketId: socket.id,
                        isOnline: true
                    }
                )
                console.log("🟣 User joined room:", userId);
                console.log("Rooms:", socket.rooms);
            } catch (error) {
                console.error("❌ identity error:", error);
            }
        })

        socket.on("disconnect", async () => {
            try {
                if (!socket.userId) return;

                await userModel.findByIdAndUpdate(
                    socket.userId,
                    {
                        socketId: null,
                        isOnline: false
                    }
                )
                console.log("🔴 Socket disconnected:", socket.userId);
            } catch (error) {
                console.error("❌ disconnect error:", error);
            }
        })
    })
}
