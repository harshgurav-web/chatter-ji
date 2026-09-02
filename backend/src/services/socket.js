const { Server } = require("socket.io");

const {
    socketAuthMiddleware
} = require("../middlewares/socket.auth.middleware.js");

let io;

const userSocketMap = {};

function getReceiverSocketId(userId) {
    return userSocketMap[userId.toString()];
}

function initializeSocket(server) {

    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });

    // Socket authentication
    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {

        console.log(
            "A user connected:",
            socket.user.fullname || socket.user.fullName
        );

        const userId = socket.userId.toString();

        // Store online user
        userSocketMap[userId] = socket.id;

        // Send online users to everyone
        io.emit(
            "getOnlineUsers",
            Object.keys(userSocketMap)
        );

        // User disconnected
        socket.on("disconnect", () => {

            console.log(
                "A user disconnected:",
                socket.user.fullname || socket.user.fullName
            );

            delete userSocketMap[userId];

            io.emit(
                "getOnlineUsers",
                Object.keys(userSocketMap)
            );
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.IO has not been initialized");
    }

    return io;
}

module.exports = {
    initializeSocket,
    getIO,
    getReceiverSocketId
};