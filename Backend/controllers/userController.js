import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

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

export {signupUser};