import express from 'express';
import { PreparationController } from '../controllers/PreparationController.js';
const controller = new PreparationController();
const router = express.Router();

router.get('/preparations', controller.getAll);
router.get('/preparations/:id', controller.getById);
router.post('/preparations', controller.create);
router.delete('/preparations/:id', controller.delete);

export default router;