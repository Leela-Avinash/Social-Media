import express from "express";
import { commentOnPost, createPost, deletePost, getFeed, getPost, likePost } from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeed)
router.get("/:id", getPost)
router.post("/create",protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likePost);
router.post("/comment/:id", protectRoute, commentOnPost)

export default router;