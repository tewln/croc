import express from 'express';
import { TaskController } from '../controllers/TaskController.js';
const controller = new TaskController();
const router = express.Router();

router.get('/tasks', controller.getInPeriod);

export default router;