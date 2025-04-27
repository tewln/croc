import express from 'express';
import { MeasureBookController } from '../controllers/MeasureBookController.js';
const controller = new MeasureBookController();
const router = express.Router();

router.get('/measure-book/patient/:id', controller.getMeasuresOfPatient);
router.post('/measure-book', controller.createMeasure);
router.put('/measure-book/:id/complete', controller.completeMeasure);

export default router;