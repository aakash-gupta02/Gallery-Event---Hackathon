import { Router } from "express";
import { createLike, getLikes, getUserLikes, isLiked, removeLike } from "../controller/like.controller";
import { authMiddleware } from "../middleware/autth.middleware";

const router = Router();

router.post("/add/:mediaId", authMiddleware, createLike);
router.delete("/remove/:mediaId", authMiddleware, removeLike);
router.get("/get/:mediaId", authMiddleware, getLikes )
router.get("/is-liked/:mediaId", authMiddleware, isLiked); 
router.get("/user-likes", authMiddleware, getUserLikes);

export default router;

