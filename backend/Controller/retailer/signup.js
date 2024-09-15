import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../prisma/index.js";
import asyncHandler from "express-async-handler";
import axios from "axios";
const signup = asyncHandler(async (req, res) => {
  const { retailer_name, email, phone, password, website, GST_No, address } =
    req.body;

  const user = await prisma.retailer.findUnique({
    where: { email },
  });
  if (user) {
    res.json({ message: "Retailer  with this mail already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  try {
    console.log("Address received:", address);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Address object:", address);

    if (!address.city || !address.country) {
      return res
        .status(400)
        .json({ message: "City and Country are required in the address." });
    }

    const addressString = `${address.city}, ${address.country}`;

    const apiKey = process.env.MAPS_API_KEY;
    const response = await axios.get("https://geocode.maps.co/search", {
      params: {
        q: addressString,
        api_key: apiKey,
      },
    });

    address.latitude = parseFloat(response.data[0].lat);
    address.longitude = parseFloat(response.data[0].lon);

    // Create a new manufacturer
    const newRetailer = await prisma.retailer.create({
      data: {
        retailer_name,
        email,
        phone,
        password: hashedPassword, // Store the hashed password
        website,
        GST_No,
        address: {
          create: address, // Directly pass the address object instead of an array
        },
      },
      include: {
        address: true,
      },
    });

    if (newRetailer) {
      const token = jwt.sign(
        { retailerId: newRetailer.id },
        process.env.ACCESS_TOKEN_SECRET_USER,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.status(201).json({
        message: "retailer created successfully!",
        manufacturer: newRetailer,
        cookie: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const retailer = await prisma.retailer.findUnique({
      where: { email },
    });
    if (!retailer) {
      return res.status(401).json({ message: "Retailer not found" });
    }

    const validPassword = await bcrypt.compare(password, retailer.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { retailerId: retailer.id },
      process.env.ACCESS_TOKEN_SECRET_USER,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Retailer logged in successfully",
      retailer,
      cookie: token,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login" });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});

export { signup, login, logout };
