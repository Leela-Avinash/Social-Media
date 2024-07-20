import User from "../models/userModel.js";
import Post from "../models/postModel.js"

const createPost = async (req, res) => {
    try {
        const {postedby, caption, img} = req.body;

        if(!postedby){
            return res.status(400).json({message: "Please login to post"});
        }
        if(!caption && !img) {
            return res.status(400).json({message: "Please upload something to post"});
        }

        const user = await User.findById(postedby);
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        if(req.user._id.toString() !== postedby){
            return res.status(400).json({message: "Unauthorized to create post"});
        }

        if(caption.length > 500){
            return res.status(400).json({message: "Caption length must be below 500 characters"});
        }

        const post = await Post.create({postedby, caption, img});

        if(post) {
            res.status(200).json({message: "Post successfully Created"});
        } else{
            res.status(500).json({message: "Internal Server error"});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in create post: ", err.message);
    }
}

export {createPost};