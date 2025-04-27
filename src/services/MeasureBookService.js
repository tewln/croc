import { MeasureBookDAO } from '../dao/MeasureBookDAO.js';
import { MeasureBook } from '../models/MeasureBook.js';
const dao = new MeasureBookDAO();

export class MeasureBookService {
    async getByPatientId(patientId) {
        const measureData = await dao.getById(patientId);
        if (!measureData) {
            throw new Error('Измерения не найдены');
        }
        return measureData;
    }

    async create(measureData) {
        const measure = MeasureBook.fromData(measureData);
        const measureId = await dao.add(measure);
        return measureId;
    }

    async update(id, date) {
        await dao.update(id, date);
    }

}
