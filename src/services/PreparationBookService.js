import { PreparationBookDAO } from '../dao/PreparationBookDAO.js';
import { PreparationBook } from '../models/PreparationBook.js';
import { TaskInformation } from '../models/TaskInformation.js';
import '../errors.js';
import { InternalServerError } from '../errors.js';
const dao = new PreparationBookDAO();

export class PreparationBookService {
    async getByPatientId(id) {
        try {
            const prepBooks = await dao.getByPatientId(id);
            if (!prepBooks) {
                throw new NotFoundError('Назначения не найдены');
            }
            return prepBooks;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении назначений: ${error.message}`);
        }
    }

    async getByPatientData(preparation_book_id) {
        try {
            const result = await dao.getByData(preparation_book_id);
            const taskInfo = TaskInformation.fromData(result)
            return taskInfo;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении данных назначения: ${error.message}`);
        }
    }

    async add(patientId, preparationId, dosageId, quantity, scheduledAt) {
        try {
            const errors = [];
            if (!patientId) errors.push('patientId');
            if (!preparationId) errors.push('preparationId');
            if (!dosageId) errors.push('dosageId');
            if (!quantity || quantity <= 0) errors.push('quantity');
            if (!scheduledAt) errors.push('scheduledAt');
            if (errors.length > 0) {
                throw new ValidationError('Не все обязательные поля заполнены корректно', errors);
            }
            const prepBook = new PreparationBook(
                null,
                patientId,
                preparationId,
                dosageId,
                quantity,
                scheduledAt,
                null
            );
            
            return await dao.add(prepBook);
        } catch (error) {
            if (error instanceof ValidationError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            } else if (error.code === '23505') {
                throw new ConflictError('Такое назначение уже существует');
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при добавлении назначения: ${error.message}`);
        }
    }

    async update(preparation_book_id, completed_at) {
        try {
            await dao.update(preparation_book_id, completed_at);
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при обновлении назначения: ${error.message}`);
        }
    }
}
