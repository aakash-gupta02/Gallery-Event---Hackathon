import { Router } from "express";
import { createComment, getComments, deleteComment, updateComment } from "../controller/comment.controller";
import { authMiddleware } from "../middleware/autth.middleware";
const router = Router();



router.post("/add", authMiddleware, createComment);
router.get("/get/:mediaId", getComments);  
router.delete("/delete/:id", authMiddleware, deleteComment);
router.put("/update/:id", authMiddleware, updateComment); 



export default router;