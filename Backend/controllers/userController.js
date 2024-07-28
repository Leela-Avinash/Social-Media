import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateToken.js";

const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username })
            .select("-password")
            .select("-updatedAt");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User found", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in get user: ", err.message);
    }
};

const signupUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, username, password } = req.body;
        let user = await User.findOne({ $or: [{ email, username }] });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            generateTokenAndSetCookie(user._id, res);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(400).json({ message: "invalid user data" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in signup user: ", err.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const user = await User.findOne(isEmail ? { email: identifier } : { username: identifier });

        if (!user) {
            return res.status(400).json({ message: "Invalid Username or Email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        generateTokenAndSetCookie(user._id, res);
        console.log("success")
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in login user: ", err.message);
    }
};


const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "Logged out Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in logout user: ", err.message);
    }
};

const followUnfollow = async (req, res) => {
    try {
        const { id } = req.params;
        const targetUser = await User.findById(id);
        const currentuser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({
                message: "you cannot follow / unfollow yourself",
            });
        }

        if (!targetUser || !currentuser) {
            return res.status(400).json({ message: "user not found" });
        }

        const isFollowing = currentuser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(currentuser._id, {
                $pull: { following: id },
            });
            await User.findByIdAndUpdate(id, {
                $pull: { followers: currentuser._id },
            });
            return res.status(200).json({ message: "unfollowed successfully" });
        } else {
            await User.findByIdAndUpdate(currentuser._id, {
                $push: { following: id },
            });
            await User.findByIdAndUpdate(id, {
                $push: { followers: currentuser._id },
            });
            return res.status(200).json({ message: "followed successfully" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
        console.log("Error in followUnfollow user: ", err.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, username, email, password, profilepic, bio } = req.body;
        const userId = req.user._id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (req.params.id !== userId.toString()) {
            return res
                .status(400)
                .json({ message: "You cannot update other user's profile" });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilepic = profilepic || user.profilepic;
        user.bio = bio || user.bio;

        user = await user.save();

        res.status(200).json({ message: "Profile updated Successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in update user: ", err.message);
    }
};

export {
    signupUser,
    loginUser,
    logoutUser,
    followUnfollow,
    updateUser,
    getUserProfile,
};



