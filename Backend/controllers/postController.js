import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentsModel.js";

const createPost = async (req, res) => {
    try {
        const { postedby, caption, img } = req.body;

        if (!postedby) {
            return res.status(400).json({ message: "Please login to post" });
        }
        if (!caption && !img) {
            return res
                .status(400)
                .json({ message: "Please upload something to post" });
        }

        const user = await User.findById(postedby);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.user._id.toString() !== postedby) {
            return res
                .status(400)
                .json({ message: "Unauthorized to create post" });
        }

        if (caption.length > 500) {
            return res
                .status(400)
                .json({
                    message: "Caption length must be below 500 characters",
                });
        }

        const post = await Post.create({ postedby, caption, img });

        if (post) {
            res.status(200).json({ message: "Post successfully Created" });
        } else {
            res.status(500).json({ message: "Internal Server error" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in create post: ", err.message);
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in get post: ", err.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = await req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.postedby.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ message: "Unauthorized to delete post" });
        }

        await Post.findByIdAndDelete(id);
        await Comment.deleteMany({ postid: id });

        res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in delete post: ", err.message);
    }
};

const likePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userLikedPost = post.likes.includes(userId);
        if (userLikedPost) {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $pull: { likes: userId } }
            );
            return res
                .status(200)
                .json({ message: "Successfully unliked the post" });
        } else {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $push: { likes: userId } }
            );
            return res
                .status(200)
                .json({ message: "Successfully liked the post" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in like post: ", err.message);
    }
};

const getFeed = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(400)
                .json({ message: "Please login to view posts" });
        }

        const following = user.following;
        const feedPosts = await Post.find({
            postedby: { $in: following },
        }).sort({ createdAt: -1 });
        res.status(200).json(feedPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in feed post: ", err.message);
    }
};

export { createPost, getPost, deletePost, likePost, getFeed };
