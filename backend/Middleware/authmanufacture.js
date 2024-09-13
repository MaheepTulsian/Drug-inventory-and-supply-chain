import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../prisma/index.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const cookie = req.cookies["jwt"];

    if (!cookie) {
      return res.status(401).json({ message: "Unauthenticated: No JWT token" });
    }

    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET_USER);

    if (!claims || !claims.manufacturerId) {
      return res
        .status(401)
        .json({ message: "Unauthenticated: Invalid JWT token" });
    }

    if (!claims) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = claims;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
