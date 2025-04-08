import {PatientService} from '../services/PatientService.js';
const service = new PatientService();

export class PatientController {
    async getPatient(req, res) {
        try {
            const patient = await service.getById(req.params.id);
            res.json({
                patients: [patient]
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
    async getPatients(req, res) {
        try {
            const patients = await service.getAll();
            res.json({
                patients: patients
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }

    async createPatient(req, res) {
        try {
            const patientData = req.body;
            const patientId = await service.create(patientData);
            res.status(201).json({
                id: patientId
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async deletePatient(req, res) {
        try {
            await service.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
