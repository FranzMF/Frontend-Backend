// routes/chatRoutes.js
import express from "express";
import { askChat } from "../controllers/chatController.js";
// import { ensureAuth } from "../middlewares/authMiddleware.js"; // opcional

const router = express.Router();

router.post("/ask", askChat);

export default router;
