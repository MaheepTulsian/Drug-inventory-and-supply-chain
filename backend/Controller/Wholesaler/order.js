import prisma from "../../prisma/index.js";

const createOrdertoManufacturer = async (req, res) => {
   const wholesaler_id = req.user.wholesalerId;
     const manufacturer_id = req.params.manufacturer_id;
 
  try {
    const order = await prisma.order_Received.create({
      data: {
        wholesaler_id: wholesaler_id,
        manufacturer_id: manufacturer_id,
        order_items: {
          create: req.body.order_items.map((item) => ({
            medicine_id: item.medicine_id,
            quantity: item.quantity,
            selling_price: item.selling_price,
          })),
        },
      },
      include: {
        order_items: true, // Include order items in the response
      },
    });

    return res.status(200).json({
     message: 'Order Created Succesfully!',
     data: order,
   });

   
  } catch (error) {
     return res.status(500).json({
          message: 'Server error',
          error: error.message,
        });
  }
};

export { createOrdertoManufacturer };
