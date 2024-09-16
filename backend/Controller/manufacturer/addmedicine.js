import prisma from "../../prisma/index.js";

// add a medicine to the manufacturer

const addMedicine = async (req, res) => {
  const { medicine_name, category_name, batches } = req.body;
  // const { manufacturer_id } = req.params;
  const manufacturer_id = req.user.manufacturerId;
  try {
    // Check if the manufacturer exists
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { manufacturer_id },
    });
    if (!manufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }
    // Create a new medicine and link it to the manufacturer
    const newMedicine = await prisma.medicinesGallery.create({
      data: {
        medicine_name,
        category_name,
        batches: {
          create: batches.map((batch) => ({
            batch_id: batch.batch_id,
            manufacture_date: new Date(batch.manufacture_date),
            expiry_date: new Date(batch.expiry_date),
            quantity: batch.quantity,
            current_stock: batch.current_stock,
            reorder_threshold: batch.reorder_threshold,
            strip_quantity: batch.strip_quantity,
            tablets_per_strip: batch.tablets_per_strip,
            mrp: batch.mrp,
            selling_price: batch.selling_price,
            cost_price: batch.cost_price,
            batch_status: batch.batch_status,
          })),
        },
        manufacturer: {
          connect: { manufacturer_id },
        },
      },
    });

    return res.status(201).json({
      message: "Medicine added successfully",
      data: newMedicine,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
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
    // expiry_status,
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
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Create a new batch for the medicine
    const newBatch = await prisma.batch.create({
      data: {
        batch_id,
        manufacture_date: new Date(manufacture_date),
        expiry_date: new Date(expiry_date),
        // expiry_status,
        quantity,
        current_stock: quantity, // Set initial stock to the same as the batch quantity
        reorder_threshold: parseInt(quantity * 0.1) || 0,
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
      message: "Batch added successfully",
      data: newBatch,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
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
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Check if the batch exists for the medicine
    const batch = await prisma.batch.findUnique({
      where: { batch_id },
    });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Update the stock quantity of the batch
    const updatedBatch = await prisma.batch.update({
      where: { batch_id },
      data: {
        current_stock: batch.current_stock + additional_stock,
      },
    });

    return res.status(200).json({
      message: "Stock added successfully",
      data: updatedBatch,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// to get all medicines for a manufacturer

const getAllMedicines = async (req, res) => {
  // const { manufacturer_id } = req.params;
  const claims = req.user;
  const manufacturer_id = claims.manufacturerId;

  try {
    // Check if the manufacturer exists
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { manufacturer_id },
    });

    if (!manufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }

    // Fetch all medicines related to the manufacturer
    const medicines = await prisma.medicinesGallery.findMany({
      where: { manufacturer_id },
      include: {
        batches: true, // Include related batches if needed
        sales: true, // Include related sales if needed
      },
    });

    if (medicines.length === 0) {
      return res
        .status(404)
        .json({ message: "No medicines found for this manufacturer" });
    }

    return res.status(200).json({
      message: "Medicines fetched successfully",
      data: medicines,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { addMedicine, addBatchToMedicine, addStockToMedicine, getAllMedicines };
