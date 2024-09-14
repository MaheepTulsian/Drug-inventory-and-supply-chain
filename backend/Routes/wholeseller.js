import express from "express";
const router = express.Router();
import { verifyJWT } from "../Middleware/authmanufacture.js";
import multer from "multer";
const upload = multer();

import { signup, login, logout } from "../Controller/Wholesaler/signup.js";

router.route("/signup").post(upload.none(), signup);
router.route("/login").post(upload.none(), login);
router.route("/logout").get(upload.none(), logout);

export default router;
