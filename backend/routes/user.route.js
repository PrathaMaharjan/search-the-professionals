// routes/user.js
import { Router } from "express";
import { getUserList, searchUser, getUserById, updateUser } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { uploadProfilePicture } from "../controller/profile-Picture.controller.js";
import { upload } from "../middleware/image-uploader.middleware.js";

const router = Router();

router.get("/list", authMiddleware, getUserList);
router.get("/search", authMiddleware, searchUser);
router.get("/:id", authMiddleware, getUserById);  
router.patch("/uploadProfilePicture", authMiddleware, upload.single("image"), uploadProfilePicture);
router.patch("/updateUser", authMiddleware, updateUser);

export default router;
