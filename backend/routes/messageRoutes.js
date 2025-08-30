import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getMessages, getUsers, sendMessages } from "../controllers/messageController.js";
const router = express.Router();

router.get("/users",protectedRoute,getUsers);
router.get("/getMessage/:id",protectedRoute,getMessages)

router.post("/create-message/:id",protectedRoute,sendMessages)

export default router;