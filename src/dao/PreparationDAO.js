import db from '../config/db.js';
import { Preparation } from '../models/Preparation.js';
import '../errors.js';

export class PreparationDAO {
    async getAll() {
        try {
            const query = 'SELECT * FROM croc.preparation';
            const result = await db.query(query);
            return result.rows.map(prepData => new Preparation(
                prepData.id,
                prepData.name,
                prepData.narcotic
            ));
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async getById(id) {
        try {
            const query = 'SELECT * FROM croc.preparation WHERE id = $1';
            const result = await db.query(query, [id]);
            
            if (result.rows.length === 0) {
                return null;
            }

            const prepData = result.rows[0];
            return new Preparation(
                prepData.id,
                prepData.name,
                prepData.narcotic
            );
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async add(preparation) {
        try {
            const query = `
                INSERT INTO croc.preparation_book (patient, preparation, quantity, date)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `;
            const result = await db.query(query, preparation.getDataByList());
            return result.rows[0].id;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else if (error.code === '23505') {
                console.error(error.stack);
                throw error;
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async delete(id) {
        try {
            const query = 'DELETE FROM croc.preparation WHERE id = $1';
            const result = await db.query(query, [id]);
            if (result.rowCount === 0) {
                throw new NotFoundError('Препарат не найден');
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
    
    async getDosages(preparationId) {
        try {
            const query = 'SELECT * FROM croc.dosage WHERE preparation_id = $1';
            const result = await db.query(query, [preparationId]);
            return result.rows;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
}