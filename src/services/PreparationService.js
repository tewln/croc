import { PreparationDAO } from '../dao/PreparationDAO.js';
import { Preparation } from '../models/Preparation.js';
const dao = new PreparationDAO();
//not used
export class PreparationService {
        async getAll() {
        const preparations = await dao.getAll();
        if (!preparations || preparations.length === 0) {
            throw new Error('Препараты не найдены');
        }
        return preparations;
    }

    async getById(id) {
        const preparation = await dao.getById(id);
        if (!preparation) {
            throw new Error('Препарат не найден');
        }
        return [preparation];
   }

    async create(preparationData) {
        const preparation = Preparation.fromData(preparationData);
        return await dao.add(preparation);
    }

    async update(id, preparationData) {
            const preparation = Preparation.fromData({ id, ...preparationData });
        await dao.update(preparation);
    }
}
