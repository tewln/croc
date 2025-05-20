import { MeasureService } from '../services/MeasureService.js';
const service = new MeasureService();
//not usesd
export class MeasureController {
    async getAllMeasures(req, res) {
        try {
            const measures = await service.getAllMeasures();
            res.json({
                measures: measures
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }

    async getMeasureById(req, res) {
        try {
            const measure = await service.getMeasureById(req.params.id);
            res.json({
                measure: measure
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
}