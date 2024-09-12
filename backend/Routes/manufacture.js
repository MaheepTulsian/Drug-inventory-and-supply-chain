import express from 'express';
const router = express.Router();
import { signup } from '../Controllers/manufacturer/signup';
import { getManufacturerById } from '../Controllers/manufacturer/fetchprofile';
import { addMedicine,addBatchToMedicine, addStockToMedicine, getAllMedicines } from '../Controllers/manufacturer/addmedicine';

router.route('/signup').post(signup);
router.route('/:id', getManufacturerById).get(getManufacturerById);
router.route('/addmedicine').post(addMedicine);
router.route('/addBatch/:medicine_id').post(addBatchToMedicine);
router.route('/addstock/:medicine_id').post(addStockToMedicine);
router.route('/medicines/:manufacturer_id').get(getAllMedicines);

export default router;