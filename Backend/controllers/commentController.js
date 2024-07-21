import Comment from "../models/commentsModel.js";
import Post from "../models/postModel.js";

const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const { postid } = req.params;
        const commentedby = req.user._id;
        const userprofilepic = req.user.profilepic;
        const username = req.user.username;

        if (!text) {
            return res.status(400).json({ message: "text field is required" });
        }

        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        const comment = await Comment.create({
            postid,
            commentedby,
            text,
            userprofilepic,
            username,
        });

        if (comment) {
            res.status(200).json({ message: "comment successfully posted" });
        } else {
            res.status(500).json({ message: "Internal Server error" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in comment post: ", err.message);
    }
};

const likeComment = async (req, res) => {
    try {
        const {commentid} = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentid);
        if(!comment) {
            return res.status(404).json({message: "comment not found"});
        }

        const userLikedPost = comment.likes.includes(userId);
        if (userLikedPost) {
            await Comment.findByIdAndUpdate(
                { _id: commentid },
                { $pull: { likes: userId } }
            );
            return res
                .status(200)
                .json({ message: "Successfully unliked the comment" });
        } else {
            await Comment.findByIdAndUpdate(
                { _id: commentid },
                { $push: { likes: userId } }
            );
            return res.status(200).json({message: "Succefully liked the comment"});
        }

    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in like comment: ", err.message);
    }
};

const deleteComment = async (req, res) => {
    try {
        const {commentid} = req.params;
        const comment = await Comment.findById(commentid);

        if(!comment) {
            return res.status(404).json({message: "Comment not found"});
        }

        const post = await Post.findById(comment.postid);
        const postOwnerId = post.postedby;
        console.log(postOwnerId)

        if(comment.commentedby.toString() !== req.user._id.toString() && postOwnerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Unauthorized to delete somebody's comment"})
        }

        await Comment.findByIdAndDelete(commentid);

        res.status(200).json({message: "Deleted Successfully"});
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in delete comment: ", err.message);
    } 
} 

const getComments = async (req, res) => {
    try {
        const {postid} = req.params;
        const post = await Post.findById(postid);

        if(!post) {
            return res.status(404).json({message: "Post not found"});
        }

        const comments = await Comment.find({postid: postid});
        res.status(200).json({comments});
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in get comments: ", err.message);
    }
}

export {commentOnPost, likeComment, deleteComment, getComments};