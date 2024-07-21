import express from "express";
import {
    createPost,
    deletePost,
    getFeed,
    getPost,
    likePost,
} from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeed);
router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likePost);

export default router;
