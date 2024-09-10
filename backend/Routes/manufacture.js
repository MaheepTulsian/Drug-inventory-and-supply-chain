import express from "express";
import prisma from "../prisma/index.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getUserClaims = (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET_USER);
    if (!claims) {
      return null;
    }
    return claims;
  } catch (error) {
    return null;
  }
};

const signup = asyncHandler(
  ("/signup",
  async (req, res) => {
    const { company_name, email, phone, password, website, GST_No, address } =
      req.body;

    try {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new manufacturer
      const newManufacturer = await prisma.manufacturer.create({
        data: {
          company_name,
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
      if (newManufacturer) {
        const token = jwt.sign(
          { manufacturerId: newManufacturer.id },
          process.env.ACCESS_TOKEN_SECRET_USER,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(201).json({
          message: "Manufacturer created successfully!",
          manufacturer: newManufacturer,
          cookie: token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during signup." });
    }
  })
);

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const manufacturer = await prisma.manufacturer.findUnique({
    where: { email },
  });

  if (!manufacturer) {
    return res.status(401).json({ message: "Manufacturer not found" });
  }

  const passwordMatch = await bcrypt.compare(password, manufacturer.password);

  // If password does not match
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { manufacturerId: manufacturer.manufacturer_id }, // Ensure you use the correct field for ID
    process.env.ACCESS_TOKEN_SECRET_USER,
    { expiresIn: "1d" }
  );

  // Set the token in an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Respond with success
  res.status(200).json({
    message: "Manufacturer logged in successfully!",
    manufacturer,
    token, // Send the token in the response if needed
  });
});
export { signup, login };
