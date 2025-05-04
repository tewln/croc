import { PreparationBookDAO } from '../dao/PreparationBookDAO.js';
import { PreparationBook } from '../models/PreparationBook.js';
const dao = new PreparationBookDAO();
//not used
export class PreparationBookService {
        async getByPatientId(patientId) {
        const preparations = await dao.getByPatientId(patientId);
        if (!preparations) {
            throw new Error('Назначения не найдены');
        }
        return preparations;
    }

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

    async update(id, completedAt) {
        await dao.update(id, completedAt);
    }
}
