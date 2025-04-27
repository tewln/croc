import { MeasureBookService } from '../services/MeasureBookService.js';
const service = new MeasureBookService();

export class MeasureBookController {
    async getMeasuresOfPatient(req, res) {
        try {
            const measures = await service.getByPatientId(req.params.id);
            res.json({
                measures: measures
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }

    async createMeasure(req, res) {
        try {
            const measureId = await service.create({
                patient: req.body.patient,
                measureType: req.body.measureType,
                scheduledAt: req.body.scheduledAt
            });
            res.status(201).json({
                id: measureId
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async completeMeasure(req, res) {
        try {
            await service.update(req.params.id, req.body.completedAt);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}