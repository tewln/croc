import express from 'express';
import { DepartmentController } from '../controllers/DepartmentController.js';
const controller = new DepartmentController();
const router = express.Router();

router.get('/department/staff/:id', controller.getDepartmentsOfStaff);
router.get('/department/:id', controller.getDepartment);
router.get('/department', controller.getDepartments);

export default router;