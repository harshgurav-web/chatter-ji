const uploadFile = require("../services/imagekit.js");

const { getReceiverSocketId, io } = require("../services/socket");

const Message = require("../models/message.model.js");
const User = require("../models/user.model.js");


async function getAllContacts(req, res) {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId }
        }).select("-password");

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getAllContacts:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function getMessagesByUserId(req, res) {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        });

        return res.status(200).json(messages);

    } catch (error) {
        console.log(
            "Error in getMessages controller:",
            error.message
        );

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


async function sendMessage(req, res) {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.user._id;
        console.log("senderId", senderId);
        // Check whether text or image was provided
        if (!text && !req.file) {
            return res.status(400).json({
                message: "Text or image is required."
            });
        }

        // Prevent sending message to yourself
        if (senderId.equals(receiverId)) {
            return res.status(400).json({
                message: "Cannot send messages to yourself."
            });
        }

        // Check receiver
        const receiverExists = await User.exists({
            _id: receiverId
        });

        if (!receiverExists) {
            return res.status(404).json({
                message: "Receiver not found."
            });
        }

        let imageUrl = null;

        // Upload image to ImageKit
        if (req.file) {
            const uploadResponse = await uploadFile(
                req.file.buffer,
                req.file.originalname
            );

            imageUrl = uploadResponse.url;
        }

        // Create message
        const newMessage = new Message({
            senderId,
            receiverId,
            text: text || "",
            image: imageUrl
        });

        await newMessage.save();

        // Send real-time message through Socket.IO
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit(
                "newMessage",
                newMessage
            );
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log(
            "Error in sendMessage controller:",
            error.message
        );

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


async function getChatPartners(req, res) {
    try {
        const loggedInUserId = req.user._id;

        // Find all messages involving logged-in user
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        // Extract unique chat partner IDs
        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() ===
                    loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        const chatPartners = await User.find({
            _id: { $in: chatPartnerIds }
        }).select("-password");

        return res.status(200).json(chatPartners);

    } catch (error) {
        console.error(
            "Error in getChatPartners:",
            error.message
        );

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


module.exports = {
    getAllContacts,
    getMessagesByUserId,
    sendMessage,
    getChatPartners
};