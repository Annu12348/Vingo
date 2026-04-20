import express from 'express';
import { aiAutomationDescriptionController } from '../controller/ai.controller.js';
const router = express.Router();

router.post(
    "/autogenerate-description-byfoodname",
    aiAutomationDescriptionController
)

export default router;