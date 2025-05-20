import express from 'express';
import { StaffController } from '../controllers/StaffController.js';
const controller = new StaffController();
const router = express.Router();

router.get('staff/:id', controller.getById);
router.put('/staff', controller.setStaffId);
router.get('/staff/header', controller.getHeader);

export default router;