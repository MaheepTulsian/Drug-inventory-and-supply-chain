import prisma from "../../prisma/index.js";

// add a medicine to the manufacturer
const addMedicine = async (req, res, next) => {
     const { medicine_name, category_name, manufacturer_id } = req.body;
     try {
       // Check if the manufacturer exists
       const manufacturer = await prisma.manufacturer.findUnique({
         where: { manufacturer_id },
       });
       if (!manufacturer) {
         return res.status(404).json({ message: 'Manufacturer not found' });
       }
       // Create a new medicine and link it to the manufacturer
       const newMedicine = await prisma.medicinesGallery.create({
         data: {
           medicine_name,
           category_name,
           manufacturer: {
             connect: {
               manufacturer_id,
             },
           },
         },
       });
   
       return res.status(201).json({
         message: 'Medicine added successfully',
         data: newMedicine,
       });
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         message: 'Server error',
         error: error.message,
       });
     }
   };


// create a batch to a medicine
const addBatchToMedicine = async (req, res) => {
     const { medicine_id } = req.params;
     const {
       batch_id,
       manufacture_date,
       expiry_date,
       expiry_status,
       quantity,
       strip_quantity,
       tablets_per_strip,
       mrp,
       selling_price,
       cost_price,
       batch_status,
       reorder_threshold,
     } = req.body;
   
     try {
       // Check if the medicine exists
       const medicine = await prisma.medicinesGallery.findUnique({
         where: { medicine_id },
       });
   
       if (!medicine) {
         return res.status(404).json({ message: 'Medicine not found' });
       }
   
       // Create a new batch for the medicine
       const newBatch = await prisma.batch.create({
         data: {
           batch_id,
           manufacture_date: new Date(manufacture_date),
           expiry_date: new Date(expiry_date),
           expiry_status,
           quantity,
           current_stock: quantity, // Set initial stock to the same as the batch quantity
           reorder_threshold,
           strip_quantity,
           tablets_per_strip,
           mrp,
           selling_price,
           cost_price,
           batch_status,
           medicine_id,
         },
       });
   
       return res.status(201).json({
         message: 'Batch added successfully',
         data: newBatch,
       });
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         message: 'Server error',
         error: error.message,
       });
     }
   };



   // to add medicne to the exixting batch   
const addStockToMedicine = async (req, res) => {
     
     const { medicine_id } = req.params;
     const { batch_id, additional_stock } = req.body;
   
     try {
       // Check if the medicine exists
       const medicine = await prisma.medicinesGallery.findUnique({
         where: { medicine_id },
       });
   
       if (!medicine) {
         return res.status(404).json({ message: 'Medicine not found' });
       }
   
       // Check if the batch exists for the medicine
       const batch = await prisma.batch.findUnique({
         where: { batch_id },
       });
   
       if (!batch) {
         return res.status(404).json({ message: 'Batch not found' });
       }
   
       // Update the stock quantity of the batch
       const updatedBatch = await prisma.batch.update({
         where: { batch_id },
         data: {
           current_stock: batch.current_stock + additional_stock,
         },
       });
   
       return res.status(200).json({
         message: 'Stock added successfully',
         data: updatedBatch,
       });
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         message: 'Server error',
         error: error.message,
       });
     }
   };
   
   


// to get all medicines for a manufacturer

const getAllMedicines = async (req, res) => {
     // Extract validation errors from the request
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
   
     const { manufacturer_id } = req.params;
   
     try {
       // Check if the manufacturer exists
       const manufacturer = await prisma.manufacturer.findUnique({
         where: { manufacturer_id },
       });
   
       if (!manufacturer) {
         return res.status(404).json({ message: 'Manufacturer not found' });
       }
   
       // Fetch all medicines related to the manufacturer
       const medicines = await prisma.medicinesGallery.findMany({
         where: { manufacturer_id },
         include: {
           batches: true, // Include related batches if needed
           sales: true,   // Include related sales if needed
         },
       });
   
       if (medicines.length === 0) {
         return res.status(404).json({ message: 'No medicines found for this manufacturer' });
       }
   
       return res.status(200).json({
         message: 'Medicines fetched successfully',
         data: medicines,
       });
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         message: 'Server error',
         error: error.message,
       });
     }
   };
   
   export {
    addMedicine,
    addBatchToMedicine,
    addStockToMedicine,
    getAllMedicines
   }