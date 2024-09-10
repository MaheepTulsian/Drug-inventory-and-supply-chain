import express from "express";
import { Router } from "express";
import { signup } from "../Routes/manufacture.js";
const router = Router();

router.post("/signup", signup);

export default router;
