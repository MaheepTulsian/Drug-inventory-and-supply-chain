import express from "express";
const router = express.Router();
import { signup, login, logout } from "../Controller/manufacturer/signup.js";
import { getManufacturerById , updatemanufacturer} from "../Controller/manufacturer/fetchprofile.js";
import {
  addMedicine,
  addBatchToMedicine,
  addStockToMedicine,
  getAllMedicines,
} from "../Controller/manufacturer/addmedicine.js";

import {
  getOrdersReceivedByManufacturer,
  getReceivedOrderById,
  checkAvailability
} from "../Controller/manufacturer/orders.js";

import { verifyJWT } from "../Middleware/authmanufacture.js";
import multer from "multer";
const upload = multer();
router.route("/signup").post(signup);
router.route("/login").post(upload.none(), login);
router.route("/logout").get(logout);


// fetch manufacturer profile
router.route("/manufacturer_profile").get(verifyJWT, getManufacturerById);
//update manufacturer profile
router.route("/update").put(verifyJWT, updatemanufacturer);


router.route("/addmedicine").post(addMedicine);
router.route("/addBatch/:medicine_id").post(upload.none(), addBatchToMedicine);
router.route("/addstock/:medicine_id").post(upload.none(), addStockToMedicine);
router.route("/medicines/manufacturer_id").get(verifyJWT, getAllMedicines);


//fetching all orders recieved by manufacturer
router.route("/orders").get(verifyJWT, getOrdersReceivedByManufacturer);
// Get a Single  Recieved Order by ID
router.route("/order/:order_id").get(verifyJWT, getReceivedOrderById);
//check for availability of medicines in stock before approving order
router.route("/checkavailability").post(verifyJWT, checkAvailability);

export default router;
