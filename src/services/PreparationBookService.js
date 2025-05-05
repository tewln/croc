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

    async getByPatientData(scheduledAt, patientFullName, birthDate, preparationName) {
        const parts = patientFullName.trim().split(/\s+/);
        const surname = parts[0] || null;
        const firstname = parts[1] || null;
        const lastname = parts.length > 2 ? parts[2] : null;
        const result = await dao.getByData(scheduledAt, surname, firstname, lastname, birthDate, preparationName);
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
//not used
    async update(id, completedAt) {
        await dao.update(id, completedAt);
    }
}
