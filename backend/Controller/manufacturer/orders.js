import prisma from "../../prisma/index.js";


//creating a new order
const createOrder = async (req, res) => {
     const { manufacturer_id } = req.params;
     const { order_items, total_quantity, total_price, delivery_date, status } = req.body;
   
     try {
       // Check if manufacturer exists
       const manufacturer = await prisma.manufacturer.findUnique({
         where: { manufacturer_id },
       });
   
       if (!manufacturer) {
         return res.status(404).json({ message: 'Manufacturer not found' });
       }
   
       // Create the order
       const order = await prisma.order.create({
         data: {
           order_date: new Date(),
           delivery_date: delivery_date ? new Date(delivery_date) : null,
           status: status || 'pending',
           total_quantity,
           total_price,
           manufacturer_id,
           order_items: {
             create: order_items.map((item) => ({
               batch_id: item.batch_id,
               quantity: item.quantity,
               medicine_id: item.medicine_id,
             })),
           },
         },
         include: {
           order_items: true, // Include created order items
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
   };
   

//fetching all orders by manufacturer
   const getOrdersByManufacturer = async (req, res) => {
     const { manufacturer_id } = req.params;
   
     try {
       // Fetch all orders related to the manufacturer
       const orders = await prisma.order.findMany({
         where: { manufacturer_id },
         include: {
           order_items: true, // Include the order items for each order
         },
       });
   
       if (orders.length === 0) {
         return res.status(404).json({ message: 'No orders found for this manufacturer' });
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


   // Get a Single Order by ID
   const getOrderById = async (req, res) => {
     const { order_id } = req.params;
   
     try {
       const order = await prisma.order.findUnique({
         where: { order_id },
         include: {
           order_items: true, // Include order items
         },
       });
   
       if (!order) {
         return res.status(404).json({ message: 'Order not found' });
       }
   
       return res.status(200).json({
         message: 'Order fetched successfully',
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


   //Update Order Status
   const updateOrderStatus = async (req, res) => {
     const { order_id } = req.params;
     const { status } = req.body;
   
     try {
       const order = await prisma.order.update({
         where: { order_id },
         data: { status },
       });
   
       return res.status(200).json({
         message: 'Order status updated successfully',
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
   
   

   export{
     createOrder,
     getOrdersByManufacturer,
     getOrderById,
     updateOrderStatus
   }