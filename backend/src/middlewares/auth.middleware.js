const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authMiddleware(req,res,next) {
    console.log('auth middleware called')
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Unauthorized, no token found"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userid).select("+activeSessionId");

        if(user.activeSessionId !== decoded.sessionId){
            return res.status(401).json({
                message: "unauthorized, session not match or already expired"
            })
        }

        req.user = user

        next();
        
    } catch (error) {
        console.log("auth before account creation failed")
        res.status(401).json({message: "Unauthorized, token is not valid"})
    }
}

module.exports = {authMiddleware} 