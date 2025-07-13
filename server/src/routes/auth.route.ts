import { Router } from "express";

import { deleteUser, getLoggedInUser, getUsers, login, registerUser, toggleAdmin, updateUser } from "../controller/authController";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";
import { authMiddleware } from "../middleware/autth.middleware";
import { mediaUpload } from "../middleware/multer";


const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/get", isAdminMiddleware, getUsers)
router.put("/toggle-admin/:id", isAdminMiddleware, toggleAdmin)



router.get("/user", authMiddleware, getLoggedInUser);
router.put("/update-profile", mediaUpload, authMiddleware, updateUser)
router.delete("/delete-user", authMiddleware, deleteUser);


export default router;
