require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");

const app = require("./src/app");

const {
    initializeSocket
} = require("./src/services/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });