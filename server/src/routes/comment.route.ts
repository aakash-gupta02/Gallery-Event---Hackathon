import { Router } from "express";
import { createComment, getComments, deleteComment, updateComment, allComments, userComments } from "../controller/comment.controller";
import { authMiddleware } from "../middleware/autth.middleware";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware";
const router = Router();



router.post("/add", authMiddleware, createComment);
router.get("/get/:mediaId", getComments);  
router.get("/getadmin", authMiddleware, isAdminMiddleware, allComments ); 
router.delete("/delete/:id", authMiddleware, deleteComment);
router.put("/update/:id", authMiddleware, updateComment); 
router.get("/user",authMiddleware, userComments)



export default router;