import prisma from "../../prisma/index.js";

// fetch manufacturer profile
const getWholesalerById = async (req, res) => {
  try {
    const claims = req.user.wholesalerId;
    const wholesaler = await prisma.wholesaler.findUnique({
      where: { wholesaler_id: claims },
      include: {
        address: true,
      },
    });
    if (!wholesaler) {
      return res.status(404).json({
        message: "wholesaler not found",
      });
    }

    return res.status(200).json({
      message: "Wholesaler profile fetched successfully",
      data: wholesaler,
    });
  } catch (error) {
    console.error("Error verifying JWT or fetching manufacturer:", error);
    return res.status(401).json({
      message: "Unauthenticated: Invalid JWT token",
    });
  }
};

const updateWholesaler = async (req, res) => {
  const { wholesaler_id } = req.user.wholesalerId;
  const content = req.body;
  try {
    const updatedWholesaler = await prisma.wholesaler.update({
      where: { wholesaler_id },
      data: content,
      include: {
        address: true,
      },
    });
    if (updatedWholesaler) {
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

export { getWholesalerById, updateWholesaler };
