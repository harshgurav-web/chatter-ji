const express = require("express");
const multer = require("multer");

const {
    getAllContacts,
    getMessagesByUserId,
    sendMessage,
    getChatPartners
} = require("../controller/message.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});


router.get(
    "/contacts",
    authMiddleware,
    getAllContacts
);


router.get(
    "/chat/:id",
    authMiddleware,
    getMessagesByUserId
);


router.get(
    "/partners",
    authMiddleware,
    getChatPartners
);


router.post(
    "/send/:id",
    authMiddleware,
    upload.single("image"),
    sendMessage
);


module.exports = router;