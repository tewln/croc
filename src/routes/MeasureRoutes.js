import express from 'express';
import { MeasureController } from '../controllers/MeasureController.js';
const controller = new MeasureController();
const router = express.Router();

router.get('/measures', controller.getAllMeasures);
router.get('/measures/:id', controller.getMeasureById);

export default router;