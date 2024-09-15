import express from express;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../prisma/index.js";
import asyncHandler from "express-async-handler";

const signup = asyncHandler(async (req, res) => {

    const { retailer_name, email, phone, password, website, GST_No, address } = req.body;

})