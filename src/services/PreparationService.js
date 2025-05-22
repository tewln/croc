import { PreparationDAO } from '../dao/PreparationDAO.js';
import { Preparation } from '../models/Preparation.js';
import { NotFoundError, InternalServerError, ServiceUnavailableError } from '../errors.js';
const dao = new PreparationDAO();

export class PreparationService {
    async getAll() {
        try {
            const preparations = await dao.getAll();
            if (!preparations || preparations.length === 0) {
                throw new NotFoundError('Препараты не найдены');
            }
            return preparations;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError || 
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении препаратов: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const preparation = await dao.getById(id);
            if (!preparation) {
                throw new NotFoundError('Препарат не найден');
            }
            return [preparation];
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении препарата: ${error.message}`);
        }
    }

    async add(preparationData) {
        try {
            const preparation = Preparation.fromData(preparationData);
            return await dao.add(preparation);
        } catch (error) {
            if (error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            } else if (error.code === '23505') {
                throw new ConflictError('Препарат с таким названием уже существует');
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при добавлении препарата: ${error.message}`);
        }
    }

    async update(id, preparationData) {
            const preparation = Preparation.fromData({ id, ...preparationData });
        await dao.update(preparation);
    }

    async delete(id) {
        try {
            await dao.delete(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при удалении препарата: ${error.message}`);
        }
    }
}
