import { Router } from "express";
import { mediaUpload } from "../middleware/multer";
import { 
    uploadMedia, 
    getMedia, 
    approveMedia, 
    deleteMedia, 
    getMediaByEvent, 
    getMediaByUser, 
    getMediaById, 
    rejectMedia, 
    listApprovedMedia, 
    getMedia_Event
} from "../controller/media.controllewr";
import { authMiddleware } from "../middleware/autth.middleware";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";

const router = Router();

router.use(authMiddleware);

// upload media
router.post("/upload", mediaUpload, uploadMedia);

// all media for admin
router.get("/", isAdminMiddleware, getMedia);
router.get("/media-event", isAdminMiddleware, getMedia_Event)

// list approved media for user
router.get("/approved",  listApprovedMedia);

// get media by event id
router.get("/event/:eventId", getMediaByEvent);

// logged in user media
router.get("/user", getMediaByUser);

// get media by id
router.get("/:mediaId", getMediaById);


// approve or reject media
router.put("/approve/:mediaId", isAdminMiddleware, approveMedia);
router.post("/reject/:mediaId", isAdminMiddleware, rejectMedia);

// delete media by owner or admin
router.delete("/delete/:mediaId", deleteMedia);

export default router;
