import asyncHandler from "express-async-handler";
import prisma from "../../prisma/index.js";

const map = asyncHandler(async (req, res) => {
  const result = await prisma.manufacturer.findMany({
    include: {
      address: true,
      medicines: true,
    },
  });

  if (result.length === 0) {
    return res.status(404).json({ message: "No manufacturers found" });
  }

  const any = [];

  for (let i = 0; i < result.length; i++) {
    const addressObj = result[i].address[0]; // Access the first address

    // Only push data if `addressObj` exists
    if (addressObj) {
      any.push({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              id: result[i].manufacturer_id,
              profile_url: result[i].website,
              company_name: result[i].company_name,
              email: result[i].email,
              phone: result[i].phone,
              website: result[i].website,
              GST_No: result[i].GST_No,
              street: addressObj.street,
              city: addressObj.city,
              state: addressObj.state,
              postal_code: addressObj.postal_code,
              country: addressObj.country,
              medicines: result[i].medicines.map((medicine) => {
                return {
                  medicine_id: medicine.medicine_id,
                  medicine_name: medicine.medicine_name,
                  medicine_price: medicine.medicine_price,
                  medicine_quantity: medicine.medicine_quantity,
                };
              }),
            },
            geometry: {
              type: "Point",
              coordinates: [addressObj.longitude, addressObj.latitude], // Use longitude and latitude
            },
          },
        ],
      });
    }
  }

  res.status(200).json({
    message: "Map data fetched successfully",
    any,
  });
});

export { map };
