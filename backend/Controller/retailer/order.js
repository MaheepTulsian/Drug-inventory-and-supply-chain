import prisma from "../../prisma/index.js";

const createOrdertoWholesaler = async (req, res) => {
     const { retailer_id } = req.user.retailerId;
     const { wholesaler_id, order_items } = req.body;
     
     try {
     const order = await prisma.wholesaler_Order_received.create({
          data: {
          retailer_id,
          wholesaler_id,
          order_items: {
               create: order_items.map((item) => ({
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
     
     return res.status(201).json({
          message: 'Order created successfully',
          data: order,
     });
     } catch (error) {
     console.error(error);
     return res.status(500).json({
          message: 'Server error',
          error: error.message,
     });
     }
}