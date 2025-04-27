import express from 'express';
import { PreparationBookController } from '../controllers/PreparationBookController.js';
const controller = new PreparationBookController();
const router = express.Router();

router.get('/preparation-book/patient/:id', controller.getPreparationsOfPatient);
router.post('/preparation-book', controller.createPreparation);
router.put('/preparation-book/:id/complete', controller.completePreparation);

export default router;