import { MeasureBookDAO } from '../dao/MeasureBookDAO.js';
import { MeasureBook } from '../models/MeasureBook.js';
import { TaskInformation } from '../models/TaskInformation.js';
import { NotFoundError, InternalServerError, ConflictError } from '../errors.js';

const dao = new MeasureBookDAO();

export class MeasureBookService {
    async getByPatientId(id) {
        try {
            const measureBooks = await dao.getByPatientId(id);
            if (!measureBooks) {
                throw new NotFoundError('Измерения не найдены');
            }
            return measureBooks;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении измерений: ${error.message}`);
        }
    }

    async getPatientData(measure_book_id) {
        try {
            const result = await dao.getData(measure_book_id);
            const taskInfo = TaskInformation.fromData(result)
            return taskInfo;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении данных измерения: ${error.message}`);
        }
    }

    async add(patientId, measureTypeId, scheduledAt) {
        try {
            const measureData = new MeasureBook(
                null,
                patientId,
                measureTypeId,
                scheduledAt,
                null
            );
            return await dao.add(measureData);
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError) {
                throw error;
            } else if (error.code === '23505') {
                throw new ConflictError('Такое измерение уже запланировано');
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при добавлении измерения: ${error.message}`);
        }
    }

    async update(measure_book_id, completed_at, result) {
        try {
            await dao.update(measure_book_id, completed_at, result);
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при обновлении измерения: ${error.message}`);
        }
    }
}
