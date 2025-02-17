import { Router } from "express";
import * as chatController from "../controllers/chatControllers";

const router = Router();

router.post("/fetch-messages", chatController.fetchMessages);

export default router;
