import messageModel from "../../models/message.model.js";
import AppError from "../../utils/error.js";
import IMessageRepository from "../contracts/IMessageRepository.js";

class MongoMessageRepository extends IMessageRepository {
    async createdMassageSaved(messageData) {
        try {
            const message = await messageModel.create(messageData);
            return message;
        } catch (error) {
            throw new AppError(`Failed to create message saved: ${error.message}`, 500, error)
        }
    }
}

export default MongoMessageRepository;