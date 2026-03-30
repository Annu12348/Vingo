import messageService from "../services/message.service.js";

class messageController {
    constructor() {
        this.messageService = new messageService();
    }

    async messagesaved(req, res) {
        try {
            const message = await this.messageService.createdMessageSaved(req.body);

            res.status(201).json({
                message: "Message send successfully",
                data: message
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || "Internal server error"
            })
        }
    }
}

export default messageController;