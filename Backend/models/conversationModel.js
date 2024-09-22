import mongoose, { mongo } from "mongoose";
import { type } from "os";

const conversationSchema = mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    lastMessage:{
        text:{
            type:String,
        },
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    }
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;