import prisma from "../../prisma/index.js";

// fetch manufacturer profile
const getRetailerById = async (req, res) => {
  try {
    const claims = req.user.retailerId;
    const retailer = await prisma.retailer.findUnique({
      where: { retailer_id: claims },
      include: {
        address: true,
      },
    });
    if (!retailer) {
      return res.status(404).json({
        message: "Retailer not found",
      });
    }

    return res.status(200).json({
      message: "Retailer profile fetched successfully",
      data: wholesaler,
    });
  } catch (error) {
    console.error("Error verifying JWT or fetching manufacturer:", error);
    return res.status(401).json({
      message: "Unauthenticated: Invalid JWT token",
    });
  }
};

const updateRetailer = async (req, res) => {
  const { wholesaler_id } = req.user.retailerId;
  const content = req.body;
  try {
    const updatedRetailer = await prisma.retailer.update({
      where: { retailer_id },
      data: content,
      include: {
        address: true,
      },
    });
    if (updatedWholesaler) {
      return res.status(200).json({
        message: "Retailer updated successfully",
        data: updatedRetailer,
      });
    }
  } catch (error) {
    console.error("Error updating wholesaler:", error);
    return res.status(500).json({
      message: "An error occurred while updating wholesaler",
    });
  }
};

export { getRetailerById, updateRetailer };
