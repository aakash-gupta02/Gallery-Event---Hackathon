import { Router } from "express";

const router = Router();
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controller/event.controller";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";       
import { authMiddleware } from "../middleware/autth.middleware";

router.use(authMiddleware); 

router.post("/create", isAdminMiddleware, createEvent);
router.get("/get", getEvents);
router.get("/get/:id", getEventById);
router.put("/update/:id", isAdminMiddleware, updateEvent);
router.delete("/delete/:id", isAdminMiddleware, deleteEvent);

export default router;  