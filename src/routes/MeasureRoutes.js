import express from 'express';
import { MeasureController } from '../controllers/MeasureController.js';
const controller = new MeasureController();
const router = express.Router();
//not used
router.get('/measures', controller.getAllMeasures);
router.get('/measures/:id', controller.getMeasureById);

router.post('/preparations', controller.create);

export default router;