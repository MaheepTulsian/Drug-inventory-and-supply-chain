import express from 'express';
const router = express.Router();
import { signup, login, logout } from '../Controller/manufacturer/signup.js';
import { getManufacturerById } from '../Controller/manufacturer/fetchprofile.js';
import { addMedicine, addBatchToMedicine , addStockToMedicine, getAllMedicines } from '../Controller/manufacturer/addmedicine.js';

router.route('/signup').post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/:id', getManufacturerById).get(getManufacturerById);
router.route('/addmedicine').post(addMedicine);
router.route('/addBatch/:medicine_id').post(addBatchToMedicine);
router.route('/addstock/:medicine_id').post(addStockToMedicine);
router.route('/medicines/:manufacturer_id').get(getAllMedicines);

export default router;