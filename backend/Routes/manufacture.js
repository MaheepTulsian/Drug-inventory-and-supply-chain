import express from "express";
import prisma from "../prisma/index.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

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

      res.status(201).json({
        message: "Manufacturer created successfully!",
        manufacturer: newManufacturer,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during signup." });
    }
  })
);

export { signup };
