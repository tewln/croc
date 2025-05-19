import { MeasureBookService } from '../services/MeasureBookService.js';
const service = new MeasureBookService();

export class MeasureBookController {
//not used
    async getMeasuresByPatientId(req, res) {
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

    async getMeasureData(req, res) {
        try {
            const taskInfo = await service.getPatientData(
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
//not used
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
            await service.update(
                req.params.id,
                req.body.completedAt,
                req.body.result
            );
            res.status(200).send();
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}