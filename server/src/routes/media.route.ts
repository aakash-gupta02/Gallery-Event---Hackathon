import { Router } from "express";
import { mediaUpload } from "../middleware/multer";
import { uploadMedia } from "../controller/media.controllewr";
import { authMiddleware } from "../middleware/autth.middleware";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";

const router = Router();

router.use(authMiddleware); 

router.post("/upload", mediaUpload, uploadMedia);


export default router;