import express from 'express';
import { PreparationBookController } from '../controllers/PreparationBookController.js';
const controller = new PreparationBookController();
const router = express.Router();
//not used
router.get('/preparation-book/patient/:id', controller.getPreparationsByPatientId);
router.post('/preparation-book', controller.createPreparation);
router.patch('/preparation-book/task/:id', controller.completePreparation);
router.get('/preparation-book/task/:id', controller.getPreparationData);

export default router;