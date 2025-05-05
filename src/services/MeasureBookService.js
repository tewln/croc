import { MeasureBookDAO } from '../dao/MeasureBookDAO.js';
import { MeasureBook } from '../models/MeasureBook.js';
import { TaskInformation } from '../models/TaskInformation.js';
const dao = new MeasureBookDAO();

export class MeasureBookService {
//not used
    async getByPatientId(patientId) {
        const measureData = await dao.getByPatientId(patientId);
        if (!measureData) {
            throw new Error('Измерения не найдены');
        }
        return measureData;
    }

    async getByPatientData(scheduledAt, patientFullName, birthDate, measureName) {
        const parts = patientFullName.trim().split(/\s+/);
        const surname = parts[0] || null;
        const firstname = parts[1] || null;
        const lastname = parts.length > 2 ? parts[2] : null;
        const result = await dao.getByData(scheduledAt, surname, firstname, lastname, birthDate, measureName);
        const taskInfo = TaskInformation.fromData(result)
        return taskInfo;
    }
//not used
    async create(data) {
        const measureBook = new MeasureBook(
            null,
            data.patient,
            data.measureType,
            data.scheduledAt,
            null
        );
        return await dao.add(measureBook);
    }
//not used
    async update(id, completedAt) {
        await dao.update(id, completedAt);
    }
}
