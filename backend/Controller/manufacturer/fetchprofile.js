import prisma from "../../prisma/index.js";
import jwt from "jsonwebtoken";

// const getManufacturerById = async (req, res, next) => {
//   const { id } = req.params;
//   // const { id } = req.user;
//   // const cookie = req.cookies["jwt"];

//   // if (!cookie) {
//   //   return res.status(401).json({ message: "Unauthenticated: No JWT token" });
//   // }

//   // const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET_USER);

//   // if (!claims) {
//   //   return res
//   //     .status(401)
//   //     .json({ message: "Unauthenticated: Invalid JWT token" });
//   // }

//   try {
//     // Fetch manufacturer profile including address, medicines, and orders
//     const manufacturer = await prisma.manufacturer.findUnique({
//       where: { manufacturer_id: id },
//       include: {
//         address: true, // Include related address
//         medicines: {
//           include: {
//             batches: true, // Include related batches for each medicine
//             sales: true, // Include related sales for each medicine
//           },
//         },
//         orders: {
//           include: {
//             order_items: true, // Include related order items
//           },
//         },
//       },
//     });

//     // Check if manufacturer exists
//     if (!manufacturer) {
//       return res.status(404).json({
//         message: "Manufacturer not found",
//       });
//     }

//     return res.status(200).json({
//       message: "Manufacturer profile fetched successfully",
//       data: manufacturer,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

const getManufacturerById = async (req, res, next) => {
  // const cookie = req.cookies["jwt"];

  // if (!cookie) {
  //   return res.status(401).json({ message: "Unauthenticated: No JWT token" });
  // }

  try {
    // const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET_USER);

    // if (!claims || !claims.manufacturerId) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthenticated: Invalid JWT token" });
    // }
    // console.log(claims.manufacturerId);
    const claims = req.user;

    const manufacturer = await prisma.manufacturer.findUnique({
      where: { manufacturer_id: claims.manufacturerId },
      include: {
        address: true,
        medicines: {
          include: {
            batches: true,
            sales: true,
          },
        },
        orders: {
          include: {
            order_items: true,
          },
        },
      },
    });

    if (!manufacturer) {
      return res.status(404).json({
        message: "Manufacturer not found",
      });
    }

    return res.status(200).json({
      message: "Manufacturer profile fetched successfully",
      data: manufacturer,
    });
  } catch (error) {
    console.error("Error verifying JWT or fetching manufacturer:", error);
    return res.status(401).json({
      message: "Unauthenticated: Invalid JWT token",
    });
  }
};

export { getManufacturerById };
