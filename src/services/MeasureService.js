import { MeasureDAO } from '../dao/MeasureDAO.js';
import { Measure } from '../models/Measure.js';
import { InternalServerError, ServiceUnavailableError, NotFoundError, BadRequestError } from '../errors.js';

const dao = new MeasureDAO();

export class MeasureService {
    async getOfMBId(measureBookId) {
        try {
            const measureData = await dao.getById(measureBookId);
            if (!measureData) {
                throw new NotFoundError('Измерение в справочнике не найдено');
            }
            return measureData;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError
            ) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(
                `Ошибка при получении типа измерения: ${error.message}`
            );
        }
    }

    async getAll() {
        try {
            const measuresData = await dao.getAll();
            if (!measuresData || measuresData.length === 0) {
                throw new NotFoundError(
                    'Измерения в справочнике не найдены'
                );
            }
            return measuresData;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError
            ) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(
                `Ошибка при получении списка типов измерений: ${error.message}`
            );
        }
    }

    async create(measureData) {
        try {
            if (!measureData) {
                throw new BadRequestError('Не указаны данные измерения');
            }
            const measure = Measure.fromData(measureData);
            return await dao.add(measure);
        } catch (error) {
            if (error instanceof BadRequestError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            } else if (error.code === '23505') {
                throw new ConflictError('Данный тип измерения уже существует');
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при создании измерения: ${error.message}`);
        }
    }

    async update(id, date) {
        try {
            if (!id) {
                throw new BadRequestError('Не указан ID измерения');
            }
            await dao.update(id, date);
        } catch (error) {
            if (error instanceof BadRequestError ||
                error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при обновлении измерения: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const measure = await dao.getById(id);
            if (!measure) {
                throw new NotFoundError('Тип измерения не найден');
            }
            return measure;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении типа измерения: ${error.message}`);
        }
    }
}
