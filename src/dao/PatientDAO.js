import db from '../config/db.js';
import { Patient } from '../models/Patient.js';
import '../errors.js';

export class PatientDAO {
    async getById(id) {
        try {
            const query = 'SELECT * FROM croc.patient WHERE id = $1';
            const result = await db.query(query, [id]);
            if (result.rows.length === 0) {
                return null;
            }

            const patientData = result.rows[0];
            return new Patient(
                patientData.id,
                patientData.firstname,
                patientData.surname,
                patientData.lastname,
                patientData.birth_date,
                patientData.allergy
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

    async getAll() {
        try {
            const result = await db.query('SELECT * FROM croc.patient');
            if (result.rows.length === 0) {
                return [];
            }
            return result.rows.map(patientData => new Patient(
                patientData.id,
                patientData.firstname,
                patientData.surname,
                patientData.lastname,
                patientData.birth_date,
                patientData.allergy
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

    async add(patientData) {
        try {
            const query = `
                INSERT INTO croc.patient (firstname, surname, lastname, birth_date, allergy)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id
            `;
            const result = await db.query(query, patientData.getDataByList());
            return result.rows[0].id;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else if (error.code === '23505') {
                console.error(error.stack)
                throw error;
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async delete(id) {
        try {
            const query = 'DELETE FROM croc.patient WHERE id = $1';
            const result = await db.query(query, [id]);
            if (result.rowCount === 0) {
                throw new NotFoundError('Пациент не найден');
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
}
