const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

async function socketAuthMiddleware(socket, next) {
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return next(new Error("Unauthorized - No token"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userid);

        if (!user) {
            return next(new Error("Unauthorized - User not found"));
        }

        socket.user = user;
        socket.userId = user._id;

        next();

    } catch (error) {
        console.error("Socket authentication error:", error.message);
        next(new Error("Unauthorized"));
    }
}

module.exports = {
    socketAuthMiddleware
};