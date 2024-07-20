import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        postedby: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        caption: {
            type: String,
            maxLength: 500,
        },
        img: {
            type: String,
            default: "",
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
