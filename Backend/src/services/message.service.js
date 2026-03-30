import MongoMessageRepository from "../respositories/implementations/mongoMessageRepository.js";

class messageService {
    constructor () {
        this.messageRepository = new MongoMessageRepository();
    }

    async createdMessageSaved(messageData) {
        messageData.email = messageData.email.trim().toLowerCase();

        const message = await this.messageRepository.createdMassageSaved(messageData)

        return message;
    }
}

export default messageService;