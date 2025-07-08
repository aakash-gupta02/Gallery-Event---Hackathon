import { Router } from "express";

const router = Router();
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controller/event.controller";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";       

router.use(isAdminMiddleware);

router.post("/create", createEvent);
router.get("/get", getEvents);
router.get("/get/:id", getEventById);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;  