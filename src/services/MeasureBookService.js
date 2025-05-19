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

    async getPatientData(measure_book_id) {
        const result = await dao.getData(measure_book_id);
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
    
    async update(measure_book_id, completedAt, result) {
        await dao.update(
            measure_book_id,
            completedAt,
            result
        );
    }
}
