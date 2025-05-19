import express from 'express';
import { MeasureBookController } from '../controllers/MeasureBookController.js';
const controller = new MeasureBookController();
const router = express.Router();

router.get('/measure-book/patient/:id', controller.getMeasuresByPatientId);
router.post('/measure-book', controller.createMeasure);
router.patch('/measure-book/task/:id', controller.completeMeasure);
router.get('/measure-book/task/:id', controller.getMeasureData);
export default router;