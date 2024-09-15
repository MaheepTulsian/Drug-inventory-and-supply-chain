import prisma from "../../prisma/index.js";

const discontinueManufacturerBatch = async (req, res) => {
     const batch_id = req.params.batch_id;
     const { manufacturer_id } = req.user.manufacturerId;
     try{
          const batch = await prisma.batch.findUnique({
               where: { batch_id },
          });
          if (!batch) {
               return res.status(404).json({ message: 'Batch Id not found' });
          }
          if (batch.batch_status === 'Inactive') {
               return res.status(400).json({ message: 'Batch already discontinued' });
          }
          await prisma.batch.update({
               where: { batch_id },
               data: {
                    batch_status: 'Inactive',
               },
          });
          return res.status(200).json({
               message: 'Batch discontinued successfully',
          });
     }catch(error){
          console.error(error);
          return res.status(500).json({
               message: 'Server error',
               error: error.message,
          });
     }
}

export default discontinueManufacturerBatch;