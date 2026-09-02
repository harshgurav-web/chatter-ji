const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { sendWelcomeEmail } = require("../services/register.email");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const uploadFile = require("../services/imagekit");




async function register(req, res) {

    try {

        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (fullname.length < 3) {
            return res.status(400).json({ message: "Fullname must be at least 3 characters long" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existingUser = await userModel.findOne({
            $or: [
                { fullname },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await userModel.create({
            fullname,
            email,
            password,
            profilePicture: ""
        });

        if (newUser) {


            const token = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRET, { expiresIn: "2d" })
            res.cookie("token", token)

            return res.status(201).json({ message: "User created successfully", user: newUser });
        }

        // "token" → cookie name
        // token → JWT/token value
        // httpOnly: true → JavaScript in the browser cannot access the cookie
        // secure: false → allows HTTP during local development

        // For production HTTPS:
        // secure: true

    } catch (error) {
        console.log("Error in register", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}






async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const isUserExist = await userModel
            .findOne({ email })
            .select("+password");

        if (!isUserExist) {
            return res.status(401).json({
                message: "user not found"
            });
        }

        const isPasswordCorrect =
            await isUserExist.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "password not match"
            });
        }

        const sessionId = crypto.randomUUID();

        const token = jwt.sign(
            {
                userid: isUserExist._id,
                sessionId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        res.cookie("token", token);

        isUserExist.activeSessionId = sessionId;

        await isUserExist.save();

        return res.status(200).json({
            message: "user logged in successfully",
            isUserExist
        });

    } catch (error) {
        console.error("Error in loginUser:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function logOut(req, res) {
req.user.activeSessionId = null;
await req.user.save();

res.clearCookie('token');

res.status(200).json({
    message: "user logout successfully"
})
}





async function updateProfile(req, res) {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const result = await uploadFile(req.file.buffer);

        user.profilePicture = result.url;

        await user.save();

        return res.status(200).json({
            message: "Profile picture updated successfully",
            user
        });

    } catch (error) {
        console.error("Profile update error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



module.exports = { register,loginUser, logOut,updateProfile}