import { MeasureDAO } from '../dao/MeasureDAO.js';
import { Measure } from '../models/Measure.js';
const dao = new MeasureDAO();
//not used
export class MeasureService {
    async getOfMBId(measureBookId) {
        const measureData = await dao.getById(measureBookId);
        if (!measureData) {
            throw new Error('Измерение в справочнике не найдено');
        }
        return measureData;
    }

    async getAll() {
        const measuresData = await dao.getAll();
        if (!measuresData || measuresData.length === 0) {
            throw new Error('Измерения в справочнике не найдены');
        }
        return measuresData;
    }

    async create(measureData) {
        const measure = Measure.fromData(measureData);
        const measureId = await dao.add(measure);
        return measureId;
    }

    async update(id, date) {
        await dao.update(id, date);
    }
}
