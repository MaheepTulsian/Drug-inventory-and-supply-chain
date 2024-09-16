import express from "express";
const router = express.Router();
import { verifyJWT } from "../Middleware/authmanufacture.js";
import multer from "multer";
const upload = multer();
import { signup, login, logout } from "../Controller/Wholesaler/signup.js";
import {
  getWholesalerById,
  updateWholesaler,
} from "../Controller/Wholesaler/fetchprofile.js";

import {
  createOrdertoManufacturer,
  getallOrdersPlacedByWholesaler,
  getOrderPlacedByWholesaler,
} from "../Controller/Wholesaler/order.js";
import { returnOrder } from "../Controller/Wholesaler/return.js";

import { discontinueManufacturerBatch } from "../Controller/manufacturer/discontinue.js";

router.route("/signup").post(upload.none(), signup);
router.route("/login").post(upload.none(), login);
router.route("/logout").get(upload.none(), logout);

// fetch wholesaler profile
router.route("/wholesaler_profile").get(verifyJWT, getWholesalerById);
//update wholesaler profile
router.route("/update").put(verifyJWT, updateWholesaler);

// create order to manufacturer
router.route("/order/:wholesaler_id").post(createOrdertoManufacturer);
// fetch all orders placed by wholesaler
router.route("/orders").get(verifyJWT, getallOrdersPlacedByWholesaler);
// fetch order placed by wholesaler
router.route("/order/:order_id").get(verifyJWT, getOrderPlacedByWholesaler);

// return order to manufacturer
router.route("/return/:order_id").post(verifyJWT, returnOrder);

// discontinue a batch
router
  .route("/discontinue/:batch_id")
  .put(verifyJWT, discontinueManufacturerBatch);

export default router;
