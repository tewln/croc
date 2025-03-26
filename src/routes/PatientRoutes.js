import express from 'express';
import PatientController from '../controllers/PatientController.js';

const router = express.Router();

router.get('/croc.patient/:id', PatientController.getPatient);
router.get('/croc.patient', PatientController.getPatients);
router.post('/croc.patient', PatientController.createPatient);
router.delete('/croc.patient/:id', PatientController.deletePatient);

export default router;