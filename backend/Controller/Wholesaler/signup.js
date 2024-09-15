import prisma from "../../prisma/index.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
const signup = asyncHandler(async (req, res) => {
  const { wholesaler_name, email, phone, password, website, GST_No, address } =
    req.body;

  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

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
    const newWholesaler = await prisma.wholesaler.create({
      data: {
        wholesaler_name,
        email,
        phone,
        password: hashedPassword, // Store the hashed password
        website,
        GST_No,
        address: {
          create: address, // Assuming address is an array of address objects
        },
      },
      include: {
        address: true,
      },
    });
    if (newWholesaler) {
      const token = jwt.sign(
        { wholesalerId: newWholesaler.id },
        process.env.ACCESS_TOKEN_SECRET_USER,
        {
          expiresIn: "2h",
        }
      );
      res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.status(201).json({
        message: "Wholesaler created successfully!",
        wholesaler: newWholesaler,
        cookie: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const wholesaler = await prisma.wholesaler.findUnique({
    where: { email },
  });
  if (!wholesaler) {
    res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, wholesaler.password);
  if (!passwordMatch) {
    res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate a JWT token

  const token = jwt.sign(
    { wholesalerId: wholesaler.wholesaler_id },
    process.env.ACCESS_TOKEN_SECRET_USER,
    {
      expiresIn: "2h",
    }
  );
  res.cookie("jwt", token, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Respond with success
  res.status(200).json({
    message: "wholesaler logged in successfully!",
    wholesaler: wholesaler,
    token, // Send the token in the response if needed
  });
});
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});
export { signup, login, logout };
