import prisma from "../../prisma/index.js";


// Create an order to a manufacturer
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
            order_id: order.order_id,
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

//fetch all orders placed by wholesaler
const getallOrdersPlacedByWholesaler = async (req, res) => {
  const wholesaler_id = req.user.wholesalerId;

  try {
    // Fetch all orders related to the wholesaler
    const orders = await prisma.order_Received.findMany({
      where: { wholesaler_id },
      include: {
        order_items: true, // Include the order items for each order
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this wholesaler' });
    }

    return res.status(200).json({
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// fetch a single order  placed by wholesaler
const getOrderPlacedByWholesaler = async (req, res) => {
  const wholesaler_id = req.user.wholesalerId;
  const order_id = req.params.order_id;

  try {
    // Fetch the order related to the wholesaler
    const order = await prisma.order_Received.findUnique({
      where: { order_id },
      include: {
        order_items: true, // Include the order items for each order
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'No orders found for this wholesaler' });
    }

    return res.status(200).json({
      message: 'Orders fetched successfully',
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};


export { createOrdertoManufacturer , getallOrdersPlacedByWholesaler , getOrderPlacedByWholesaler};
