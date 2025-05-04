import express from 'express';
import { PreparationBookController } from '../controllers/PreparationBookController.js';
const controller = new PreparationBookController();
const router = express.Router();
//not used
router.get('/preparation-book/patient/:id', controller.getPreparationsOfPatient);
router.post('/preparation-book', controller.createPreparation);
router.put('/preparation-book/:id/complete', controller.completePreparation);
router.get('/preparation-book/task', controller.getPreparationsOfPatientDyData)

export default router;