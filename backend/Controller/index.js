import express from "express";
import { Router } from "express";
import { signup, login, logout } from "../Routes/manufacture.js";
import multer from "multer";
const app = express();
const upload = multer();
const router = Router();

router.post("/signup", upload.none(), signup);
router.post("/login", upload.none(), login);
router.get("/logout", upload.none(), logout);

export default router;
