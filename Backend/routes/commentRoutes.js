import express from "express";
import { commentOnPost, deleteComment, getComments, likeComment } from "../controllers/commentController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/post/:postid", protectRoute, commentOnPost);
router.put("/like/:commentid", protectRoute, likeComment);
router.delete("/delete/:commentid", protectRoute, deleteComment);
router.get("/:postid", protectRoute, getComments);

export default router;