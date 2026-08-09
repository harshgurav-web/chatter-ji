const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");


async function register(req, res){

    try {

        const {fullname, email, password} = req.body;

        if(!fullname || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email address"});
        }

        if(fullname.length < 3){
            return res.status(400).json({message: "Fullname must be at least 3 characters long"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const existingUser = await userModel.findOne({
            $or: [
                { fullname },
                { email }
            ]
        });

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            profilePicture: ""
        });

        if(newUser){
            return res.status(201).json({message: "User created successfully", user: newUser});
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        });

// "token" → cookie name
// token → JWT/token value
// httpOnly: true → JavaScript in the browser cannot access the cookie
// secure: false → allows HTTP during local development

// For production HTTPS:
// secure: true


    } catch (error) {
        console.log("Error in register", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {register}