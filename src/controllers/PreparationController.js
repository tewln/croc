import { PreparationService } from '../services/PreparationService.js';
const service = new PreparationService();
//not used
export class PreparationController {
    async getAll(req, res) {
        try {
            const preparations = await service.getAll();
            res.json(preparations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const preparation = await service.getById(req.params.id);
            res.json(preparation);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const preparationId = await service.create(req.body);
            res.status(201).json({ id: preparationId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await service.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}