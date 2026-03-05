const env = require("dotenv");
env.config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const JWT_KEY = process.env.JWT_KEY;

const signUpController = async(req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    try{
        const userExists = await User.findOne({username});

        if(!userExists){
            const hashedPassword = await bcrypt.hash(password, 10);

            const userCreation = await User.create({
                username: username,
                password: hashedPassword
            })
            res.status(201).json({
                msg: "User SignedUp Successfully!"
            })
        }
        else{
            res.status(409).json({
                msg: "User already exists try SignIn instead!"
            })
        }
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
}


const signInController = async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                msg: "User not found. Please sign up first."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign({ username: user.username }, JWT_KEY);

            res.status(200).json({
                msg: "SignIn Successful!",
                token: token
            });
        } else {
            res.status(401).json({
                msg: "Invalid credentials."
            });
        }
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
}

module.exports = {signUpController, signInController};