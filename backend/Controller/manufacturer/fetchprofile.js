import prisma from "../../prisma/index.js";

// fetch manufacturer profile
const getManufacturerById = async (req, res) => {
  try {
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

const updatemanufacturer = async (req, res) => {
  const { manufacturer_id } = req.user.manufacturerId;
  const content = req.body;
  try {
    const updatemanufacturer = await prisma.manufacturer.update({
      where: { manufacturer_id },
      data: content,
      include: {
        address: true,
      },
    });
    if (updatemanufacturer) {
      return res.status(200).json({
        message: "Wholesaler updated successfully",
        data: updatedWholesaler,
      });
    }
  } catch (error) {
    console.error("Error updating wholesaler:", error);
    return res.status(500).json({
      message: "An error occurred while updating wholesaler",
    });
  }
};

const getMedicine = async (req, res) => {
  const medicine_id = req.params.medicine_id;

  try {
    const medicine = await prisma.medicinesGallery.findUnique({
      where: { medicine_id },
      include: {
        batches: true,
      },
    });
    if (medicine) {
      return res.status(200).json({
        message: "Manufacturer batch details",
        data: medicine,
      });
    }
  } catch (error) {
    console.error("Error fetching medicine:", error);
    return res.status(500).json({
      message: "An error occurred while fetching batch details",
    });
  }
};

export { getManufacturerById, updatemanufacturer, getMedicine };
