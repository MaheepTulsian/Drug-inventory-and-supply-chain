import prisma from "../../prisma/index.js";


// Create a return for a received order
const createReturn = async (req, res) => {
     const wholesaler_id = req.user.wholesalerId;
     const order_id = req.params.order_id;
     const { return_reason, return_description } = req.body;
     try {
          const order = await prisma.order_Received.findUnique({
               where: { order_id },
               include: {
                    order_items: true, // Include order items
               },
          });
          if (!order) {
               return res.status(404).json({ message: 'Order Id not found' });
          }
          if (order.status === 'returned') {
               return res.status(400).json({ message: 'Order already returned' });
          }
          if (order.wholesaler_id !== wholesaler_id) {
               return res.status(400).json({ message: 'You are not authorized to return this order' });
          }
          const returnOrder = await prisma.wholesaler_return_manufacturer.create({
               data: {
                    return_reason,
                    return_description,
                    order_id,
               },
          });
          order.status = 'returned';
          // return order items to their respective batches
          const manufacturer_id=order.manufacturer_id;
          for(let i=0; i<order.order_items.length; i++){
               const medi = order.order_items[i];

               const batch= await prisma.batch.findUnique({
                    where: { batch_id: medi.batch_id },
               });

               await prisma.batch.update({
                    where: { batch_id: medi.batch_id },
                    data: {
                         current_stock: batch.current_stock + order.order_items[i].quantity,
                    },
               });
          }
          // updating the sale history of the wholesaler after returning the order
          const sales = await prisma.sale.findMany({
               where: {
                   order_id: order_id,
               },
          });
          sales.forEach(async (sale) => {
               await prisma.sale.update({
                    where: { sale_id: sale.sale_id },
                    data: {
                         status: 'returned',
                    },
               });
          });
          // updating medicine stock after returning the order from the wholesaler 
          for(let i=0; i<order.order_items.length; i++){
               const medi = order.order_items[i];
               const batch= await prisma.wholesaler_Batch.findUnique({
                    where: { batch_id: medi.batch_id },
               });
               await prisma.wholesaler_Batch.update({
                    where: { batch_id: medi.batch_id },
                    data: {
                         current_stock: batch.current_stock - order.order_items[i].quantity,
                         quantity: batch.quantity - order.order_items[i].quantity,
                    },
               });
          }

          // updating bought history of the wholesaler after returning the order
          for(let i=0; i<order.order_items.length; i++){
               const item = order.order_items[i];
               await prisma.wholesaler_Bought.update({
                    where: { order_id: item.order_id },
                    data: {
                         status: 'returned',
                    },
               });
          }



          return res.status(201).json({
               message: 'Returned recieved items successfully',
               data: returnOrder,
          });
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               message: 'Server error',
               error: error.message,
          });
     }
}