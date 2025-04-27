import { MeasureBookDAO } from '../dao/MeasureBookDAO.js';
import { MeasureBook } from '../models/MeasureBook.js';
const dao = new MeasureBookDAO();

export class MeasureBookService {
        async getByPatientId(patientId) {
        const measureData = await dao.getByPatientId(patientId);
        if (!measureData) {
            throw new Error('Измерения не найдены');
        }
        return measureData;
    }

    async create(data) {
        const measureBook = new MeasureBook(
            null,
            data.patient,
            data.measureType,
            data.scheduledAt,
            null
        );
        return await this.dao.add(measureBook);
    }

    async update(id, completedAt) {
        await this.dao.update(id, completedAt);
    }
}
