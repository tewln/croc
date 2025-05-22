import db from '../config/db.js';
import { Measure } from '../models/Measure.js';
import '../errors.js';

export class MeasureDAO {
    async getAll() {
        try {
            const query = 'SELECT * FROM croc.measure';
            const result = await db.query(query);
            return result.rows.map(measureData => new Measure(
                measureData.id,
                measureData.name,
                measureData.measure_unit
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
            const query = 'SELECT * FROM croc.measure WHERE id = $1';
            const result = await db.query(query, [id]);
            if (result.rows.length === 0) {
                return null;
            }
            const measureData = result.rows[0];
            return new Measure(
                measureData.id,
                measureData.name,
                measureData.measure_unit
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

    async add(measure) {
        try {
            const query = `
                INSERT INTO croc.measure (name, measure_unit)
                VALUES ($1, $2)
                RETURNING id
            `;
            const result = await db.query(query, [measure.name, measure.measureUnit]);
            return result.rows[0].id;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
}