import express from 'express';
import { PatientController } from '../controllers/PatientController.js';
const controller = new PatientController();
const router = express.Router();

router.get('/patient/:id', controller.getPatient);
router.get('/patient', controller.getPatients);
router.post('/patient', controller.createPatient);
router.delete('/patient/:id', controller.deletePatient);

export default router;