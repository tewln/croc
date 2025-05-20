import { PreparationBookService } from '../services/PreparationBookService.js';
const service = new PreparationBookService();
export class PreparationBookController {
//not used
    async getPreparationsByPatientId(req, res) {
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

    async getPreparationData(req, res) {
        try {
            const taskInfo = await service.getByPatientData(
                req.params.id
            );
            res.json({
                task: [taskInfo]
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }

    async completePreparation(req, res) {
        try {
            await service.update(
                req.params.id,
                req.body.completedAt
            );
            res.status(200).send();
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
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