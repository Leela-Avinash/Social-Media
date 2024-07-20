import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        postid: {
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            required: true,
        },
        commentedby: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
            minLength: 1,
        },
        userprofilepic: {
            type: String,
        },
        username: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
