import prisma from "../../prisma/index.js";

const getManufacturerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Fetch manufacturer profile including address, medicines, and orders
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { manufacturer_id: id },
      include: {
        address: true, // Include related address
        medicines: {
          include: {
            batches: true,  // Include related batches for each medicine
            sales: true     // Include related sales for each medicine
          }
        },
        orders: {
          include: {
            order_items: true // Include related order items
          }
        }
      }
    });

    // Check if manufacturer exists
    if (!manufacturer) {
      return res.status(404).json({
        message: 'Manufacturer not found'
      });
    }

    return res.status(200).json({
      message: 'Manufacturer profile fetched successfully',
      data: manufacturer
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


   export{
    getManufacturerById
   }