import { Router } from "express";

import { getUsers, login, registerUser, toggleAdmin } from "../controller/authController";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/get", isAdminMiddleware, getUsers)
router.put("/toggle-admin/:id", isAdminMiddleware, toggleAdmin)

export default router;
