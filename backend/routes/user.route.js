import { Router } from "express";
const router = Router();
import { getUserList } from "../controllers/user.controller.js";
import { authMiddleware } from "../controllers/auth.middleware.js";

router.get("/list", authMiddleware, getUserList);

export default router;