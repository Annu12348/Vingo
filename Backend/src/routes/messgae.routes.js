import express from 'express';
import messageController from '../controller/message.controller.js';
const router = express.Router();

const MessageController = new messageController();

router.post("/message", MessageController.messagesaved.bind(MessageController))

export default router;