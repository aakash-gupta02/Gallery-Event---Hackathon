import { Router } from "express";

import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, recentEvents, adminGetEvents } from "../controller/event.controller";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";       
import { authMiddleware } from "../middleware/autth.middleware";
import { mediaUpload } from "../middleware/multer";

const router = Router();

// Public routes 
router.get("/recent", recentEvents );

router.use(authMiddleware); 

router.get("/admin/all", isAdminMiddleware, adminGetEvents )

router.post("/create", mediaUpload, isAdminMiddleware, createEvent);
router.get("/get", getEvents);
router.get("/get/:id", getEventById);
router.put("/update/:id", mediaUpload, isAdminMiddleware, updateEvent);
router.delete("/delete/:id", isAdminMiddleware, deleteEvent);

export default router;  