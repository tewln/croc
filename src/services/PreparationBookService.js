import { PreparationBookDAO } from '../dao/PreparationBookDAO.js';
import { PreparationBook } from '../models/PreparationBook.js';
import { TaskInformation } from '../models/TaskInformation.js';
const dao = new PreparationBookDAO();

export class PreparationBookService {
//not used
    async getByPatientId(patientId) {
        const preparations = await dao.getByPatientId(patientId);
        if (!preparations) {
            throw new Error('Назначения не найдены');
        }
        return preparations;
    }

    async getByPatientData(preparation_book_id) {
        const result = await dao.getByData(preparation_book_id);
        const taskInfo = TaskInformation.fromData(result)
        return taskInfo;
    }
//not used
    async create(data) {
        const preparationBook = new PreparationBook(
            null,
            data.patient,
            data.preparation,
            data.dosage,
            data.quantity,
            data.scheduledAt,
            null
        );
        return await dao.add(preparationBook);
    }

    async update(preparation_book_id, completed_at) {
        await dao.update(
            preparation_book_id,
            completed_at
        );
    }
}
