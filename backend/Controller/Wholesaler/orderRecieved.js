import prisma from "../../prisma/index";

const checkAvailability = async (req, res) => {

     const { order_id } = req.params;
     try {
       const order = await prisma.wholesaler_Order_received.findUnique({
         where: { order_id },
         include: {
           order_items: true, // Include order items
         },
       });
       if (!order) {
         return res.status(404).json({ message: 'Order Id not found' });
       }
   
       if(order.status == 'Approved'){
         return res.status(200).json({
           message: 'Order already approved'
         });
       }
       // Check if the medicines are available in stock
       let isAvailable = true;
       let medicineInfo = [];
       for (let i = 0; i < order.order_items.length; i++) {
         const orderItem = order.order_items[i];
         const medicine_id = orderItem.medicine_id;
         const medicineData = await prisma.wholesaler_Medicines.findUnique({
           where: { medicine_id },
           include: {
             batches: true,
           },
         });
       
         let totalRequired = orderItem.quantity;
         let isAvailable = false;
       
         for (let j = 0; j < medicineData.batches.length; j++) {
           const batch = medicineData.batches[j];
       
           if (totalRequired == 0) {
             isAvailable = true;
             break;
           }
             // Create a new 'medi' object for each batch iteration
             let medi = {
               medicine_id: medicine_id,
               qty: 0,
               batch_id: 0,
               selling_price: 0,
             };
     
             if (totalRequired < batch.current_stock && batch.status == 'Active') {
               medi.qty = batch.current_stock;
               medi.batch_id = batch.batch_id;
               medi.selling_price = batch.selling_price;
               totalRequired =0; // Fulfill the order with this batch
             } 
         }
       
         // Check if the total quantity was fulfilled
         if (totalRequired != 0) {
           isAvailable = false;
           break;
         } else {
           medicineInfo.push(medi); 
         }
       }
   
       if (isAvailable == false) {
         return res.status(200).json({
           message: 'Not Available'
         });
       }
       else {
         order.status='Approved';
         //updating batch_id in order_items
         const items = order.order_items;
         for(let i=0; i<items.length; i++){
           const item = items[i];
           item.batch_id = medicineInfo[i].batch_id;
         }
           
           //Inventory management for wholesaler
           for(let j=0; j<medicineInfo.length; j++){
             const medi = medicineInfo[j];
             const batch = await prisma.wholesaler_Batch.findUnique({
               where: {
                   batch_id: medi.batch_id
               }
             });
   
             const new_stock = batch.current_stock - medi.qty;
             await prisma.wholesaler_Batch.update({
               where: { batch_id: medi.batch_id },
               data: {
                 current_stock: new_stock
               }
             });
           }
         
         // updating wholesaler sale history
         for(let i=0; i<medicineInfo.length; i++){
           const sale = await prisma.sale.create({
             data: {
               sold_to: order.wholesaler_id,
               medicine_id: medicineInfo[i].medicine_id,
               batch_id: medicineInfo[i].batch_id,
               quantity: medicineInfo[i].qty,
               selling_price: medicineInfo[i].selling_price,
               status: 'Approved',
               order_id: order.order_id,
               wholesaler_id: order.wholesaler_id
             }
           });
         }
   
         // Inventory management for retailer
         for(let i=0; i<medicineInfo.length; i++){
             const medi = medicineInfo[i];
             const batch = await prisma.wholesaler_Batch.findUnique({
               where: { batch_id: medi.batch_id }
             });
             const retailer_Batch = await prisma.retailer_Batch.findUnique({
               where: { batch_id: medi.batch_id }
             });
             if(!retailer_Batch){
               await prisma.retailer_Batch.create({
                 data: {
                   batch_id  : medi.batch_id,      
                   expiry_date  : batch.expiry_date,   
                   expiry_status : batch.expiry_status,
                   manufacture_date : batch.manufacture_date,
                    quantity  : medi.qty,      
                   current_stock: medi.qty,
                   reorder_threshold: batch.reorder_threshold,
                   strip_quantity  : batch.strip_quantity, 
                   tablets_per_strip: batch.tablets_per_strip,
                   mrp             : batch.mrp,
                   cost_price      : batch.selling_price, 
                   medicine_id      : batch.medicine_id       
                      
                 }
               });
             }else{
               const new_stock = retailer_Batch.current_stock + medi.qty;
               await prisma.retailer_Batch.update({
                 where: { batch_id: medi.batch_id },
                 data: {
                   current_stock: new_stock,
                   quantity: retailer_Batch.quantity + medi.qty
                 }
               });
             }
         }
   
       // updating retailer bought history
       for(let i=0; i<medicineInfo.length; i++){
         const medi = medicineInfo[i];
         const bought = await prisma.retailer_Bought.create({
           data: {
             wholesaler_id: order.retailer_id,
             medicine_id: medicineInfo[i].medicine_id,
             batch_id: medicineInfo[i].batch_id,
             quantity: medicineInfo[i].qty,
             order_id: order.order_id,
             cost_price: medicineInfo[i].selling_price,
             status: 'Approved',
           }
         });
       }
         return res.status(200).json({
           message: 'Available',
           data: medicineInfo,
         });
       }
      
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         message: 'Server error',
         error: error.message,
       });
     }
   };


   export {
    checkAvailability
   }