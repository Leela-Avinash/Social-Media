import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateToken.js";

const signupUser = async (req, res) => {
    try {
        const {name, email, username, password} = req.body;
        let user = await User.findOne({$or:[{email, username}]});
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        if(user){
            generateTokenAndSetCookie(user._id, res);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            });
        } else{
            res.status(400).json({message: "invalid user data"});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
        console.log("Error in signup user: ", err.message);
    }
}

const loginUser = async (req, res)=>{
    try {
        const {username, password} = req.body;
        let user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({message : "Invalid Username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in login user: ", err.message);       
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 1});
        res.status(200).json({message: "Logged out Successfully"});   
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in logout user: ", err.message);
    }
};

const followUnfollow = async (req, res) => {
    try {
        const {id} = req.params;
        const targetUser = await User.findById(id);
        const currentuser = await User.findById(req.user._id);

        if(id === req.user._id){
            req.status(400).json({message: "you cannot follow / unfollow yourself"});
        }

        if(!targetUser || !currentuser) {
            res.status(400).json({message: "user not found"});
        }

        const isFollowing = currentuser.following.includes(id);

        if(isFollowing){
            await User.findByIdAndUpdate(currentuser._id, { $pull: {following: id}});
            await User.findByIdAndUpdate(id, { $pull : {followers: currentuser._id}});
        } else {
            await User.findByIdAndUpdate(currentuser._id, { $push: {following: id}});
            await User.findByIdAndUpdate(id, { $push : {followers: currentuser._id}});
        }
        res.status(200).json({message: "followed successfully"});
    } catch(err) {
        res.status(500).json({message: err.message});
        console.log("Error in followUnfollow user: ", err.message);
    }
}

export {signupUser, loginUser, logoutUser, followUnfollow };