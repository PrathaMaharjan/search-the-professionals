import multer, { memoryStorage } from "multer";
import cloudinary from "../config/cloudinary.config.js";

const storage = memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req, file, cb) => {
        const allowed = ["image/jpeg", "image/png"];
        const isAllowed = allowed.includes(file.mimetype);
        cb(isAllowed ? null : new Error("Only JPEG and PNG allowed"), isAllowed);
    },
});

// upload buffer to Cloudinary
export function uploadBufferToCloudinary(buffer, options = {}) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image", ...options },
            (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(buffer);
    });
}
