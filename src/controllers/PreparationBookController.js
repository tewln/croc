import { PreparationBookService } from '../services/PreparationBookService.js';
const service = new PreparationBookService();
export class PreparationBookController {
//not used
    async getPreparationsOfPatient(req, res) {
        try {
            const preparations = await service.getByPatientId(req.params.id);
            res.json({
                preparations: preparations
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }

    async getPreparationsOfPatientDyData(req, res) {
        try {
            const taskInformation = await service.getByPatientData(
                req.body.scheduledAt,
                req.body.patientFullName,
                req.body.birthDate,
                req.body.preparationName
            );
            res.json({
                task: taskInformation
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
//not used
    async completePreparation(req, res) {
        try {
            await service.update(req.params.id, req.body.completedAt);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
//not used
    async createPreparation(req, res) {
        try {
            const preparationId = await service.create({
                patient: req.body.patient,
                preparation: req.body.preparation,
                dosage: req.body.dosage,
                quantity: req.body.quantity,
                scheduledAt: req.body.scheduledAt
            });
            res.status(201).json({
                id: preparationId
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}