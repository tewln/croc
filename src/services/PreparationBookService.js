import { PreparationBookDAO } from '../dao/PreparationBookDAO.js';
import { PreparationBook } from '../models/PreparationBook.js';
const dao = new PreparationBookDAO();

export class PreparationBookService {
    async getByPatientId(patientId) {
        const measureData = await dao.getByPatientId(patientId);
        if (!measureData) {
            throw new Error('Измерения не найдены');
        }
        return measureData;
    }

    async create(preparationData) {
        const preparation = PreparationBook.fromData(preparationData);
        const preparationId = await dao.add(preparation);
        return preparationId;
    }

    async update(id, date) {
        await dao.update(id, date);
    }
}
