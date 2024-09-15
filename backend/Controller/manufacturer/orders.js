import prisma from "../../prisma/index.js";


//fetching all orders recieved by manufacturer
const getOrdersReceivedByManufacturer = async (req, res) => {
  const { manufacturer_id } = req.user.manufacturerId

  try {
    // Fetch all orders related to the manufacturer
    const orders = await prisma.order_Received.findMany({
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


// Get a Single  Recieved Order by ID
const getReceivedOrderById = async (req, res) => {
  const { order_id } = req.params;
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


//check for availability of medicines in stock before approving order
const checkAvailability = async (req, res) => {
  const { order_id } = req.params;
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

    // Check if the medicines are available in stock
    let isAvailable = true;
    let medicineInfo = [];
    for (let i = 0; i < order.order_items.length; i++) {
      const orderItem = order.order_items[i];
      const medicine_id = orderItem.medicine_id;
      const medicineData = await prisma.medicinesGallery.findUnique({
        where: { medicine_id },
        includes: {
          batches: true,
        },
      })
      let info_medi = [];
      let medi = {
        medicine_id: medicine_id,
        qty,
        batch_id,
        selling_price
      };
      let totalRequired = orderItem.quantity;
      for (let j = 0; j < medicineData.batches.length; j++) {
        const batch = medicineData.batches[j];
        if (totalRequired == 0) {
          isAvailable = true;
          break;
        }
        if (batch.current_stock != 0) {
          if (totalRequired > batch.current_stock) {
            totalRequired = totalRequired - batch.current_stock;
            medi.qty = batch.current_stock;
            medi.batch_id = batch.batch_id;
            medi.selling_price = batch.selling_price;
            info_medi.push(medi);
          }
          else {
            totalRequired = 0;
            medi.qty = totalRequired;
            medi.batch_id = batch.batch_id;
            info_medi.push(medi);
          }
        }
      }
      if (totalRequired != 0) {
        isAvailable = false;
        break;
      }else{
        medicineInfo.push(info_medi);
      }
    }

    if (isAvailable == false) {
      return res.status(200).json({
        message: 'Not Available'
      });
    }
    else {
      //Inventory management for manufacturer
      for(let i=0; i<medicineInfo.length; i++){
        const order = await prisma.order_Received.findUnique({
          where: { order_id }
        }); 
        for(let j=0; j<medicineInfo[i].length; j++){
          const medi = medicineInfo[i][j];
          const batch = await prisma.batch.findUnique({
            where: {
              batch_id_manufacturer_id: {
                batch_id: medi.batch_id,
                manufacturer_id: manufacturer_id
              }
            }
          });
          const new_stock = batch.current_stock - medi.qty;
          await prisma.batch.update({
            where: { batch_id: medi.batch_id },
            data: {
              current_stock: new_stock
            }
          });
        }
      }

      // updating manufacturer sale history
      for(let i=0; i<medicineInfo.length; i++){
        const order = await prisma.order_Received.findUnique({
          where: { order_id }
        });
        const sold = await prisma.sale.create({
          data: {
            sold_to: order.wholesaler_id,
            medicine_id: medicineInfo[i][0].medicine_id
          }
        });
        const sold_id = sold.sold_id;
        const total_price = 0;
        for(let j=0; j<medicineInfo[i].length; j++){
          const medi = medicineInfo[i][j];
          const sale= await prisma.sale.findUnique({
            where: { sold_id: sold_id },
            include: {
              batch: true
            }
          });
          const batch = await prisma.batch.findUnique({
            where: { batch_id: medi.batch_id }
          });

          total_price += medi.qty * batch.selling_price ;
          const eachBatch_log= {
            batch_id: medi.batch_id,
            quantity: medi.qty,
            sold_id: sold_id
          }
          sale.batch.push(eachBatch_log);
        }
        await prisma.sale.update({
          where: { sold_id: sold_id },
          data: {
            total_price
          }
        });
      }

      // Inventory management for wholesaler
      for(let i=0; i<medicineInfo.length; i++){
        for(let j=0; j<medicineInfo[i].length; j++){
          const medi = medicineInfo[i][j];
          const batch = await prisma.batch.findUnique({
            where: { batch_id: medi.batch_id }
          });
          const wholesaler_batch = await prisma.wholesaler_Batch.findUnique({
            where: { batch_id: medi.batch_id }
          });
          if(!wholesaler_batch){
            await prisma.wholesaler_Batch.create({
              data: {
                batch_id  : medi.batch_id,      
                expiry_date  : batch.expiry_date,   
                expiry_status : batch.expiry_status,
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
            const new_stock = wholesaler_batch.current_stock + medi.qty;
            await prisma.wholesaler_Batch.update({
              where: { batch_id: medi.batch_id },
              data: {
                current_stock: new_stock,
                quantity: wholesaler_batch + medi.qty
              }
            });
          }
    
      }
    }

    // updating wholesaler bought history
    for(let i=0; i<medicineInfo.length; i++){
      const order = await prisma.order_Received.findUnique({
        where: { order_id }
      });
      const bought = await prisma.wholesaler_Bought.create({
        data: {
          wholesaler_id: order.wholesaler_id,
          medicine_id: medicineInfo[i][0].medicine_id,
        }
      });
      const bought_id = bought.bought_id;
      const total_price = 0;
      for(let j=0; j<medicineInfo[i].length; j++){
        const medi = medicineInfo[i][j];
        const wholesaler_Bought= await prisma.wholesaler_Bought.findUnique({
          where: { bought_id: bought_id },
          include: {
            batch: true
          }
        });
        const batch = await prisma.wholesaler_Batch.findUnique({
          where: { batch_id: medi.batch_id }
        });
        total_price += medi.qty * batch.cost_price ;
        const eachBatch_log= {
          batch_id: medi.batch_id,
          quantity: medi.qty,
          bought_id: bought_id
        }
        wholesaler_Bought.batch.push(eachBatch_log);
      }
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
  getOrdersReceivedByManufacturer,
  getReceivedOrderById,
  checkAvailability
}