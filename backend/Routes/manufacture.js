import express from "express";
const router = express.Router();
import { signup, login, logout } from "../Controller/manufacturer/signup.js";
import { getManufacturerById } from "../Controller/manufacturer/fetchprofile.js";
import {
  addMedicine,
  addBatchToMedicine,
  addStockToMedicine,
  getAllMedicines,
} from "../Controller/manufacturer/addmedicine.js";
import { createOrder } from "../Controller/manufacturer/orders.js";
import { verifyJWT } from "../Middleware/authmanufacture.js";
import multer from "multer";
const upload = multer();
router.route("/signup").post(signup);
router.route("/login").post(upload.none(), login);
router.route("/logout").get(logout);
router.route("/manufacturer_profile").get(verifyJWT, getManufacturerById);
router.route("/addmedicine").post(addMedicine);
router.route("/addBatch/:medicine_id").post(upload.none(), addBatchToMedicine);
router.route("/addstock/:medicine_id").post(upload.none(), addStockToMedicine);
router.route("/medicines/manufacturer_id").get(verifyJWT, getAllMedicines);
router.route("/:manufacturer_id/orders").post(upload.none(), createOrder);

export default router;
