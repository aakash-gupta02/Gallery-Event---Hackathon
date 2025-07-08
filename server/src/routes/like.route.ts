import { Router } from "express";
import { createLike, getLikes, removeLike } from "../controller/like.controller";
import { authMiddleware } from "../middleware/autth.middleware";

const router = Router();

router.post("/add/:mediaId", authMiddleware, createLike);
router.delete("/remove/:mediaId", authMiddleware, removeLike);
router.get("/get/:mediaId", authMiddleware, getLikes )

export default router;

