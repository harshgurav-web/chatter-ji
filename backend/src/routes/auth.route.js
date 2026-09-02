const express = require("express");
const multer = require("multer");

const {
    register,
    loginUser,
    logOut,
    updateProfile
} = require("../controller/auth.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/register", register);

router.post("/login", loginUser);

router.post("/logout", authMiddleware, logOut);

router.put(
    "/profile",
    authMiddleware,
    upload.single("image"),
    updateProfile
);

module.exports = router;