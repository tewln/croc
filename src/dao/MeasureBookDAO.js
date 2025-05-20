import db from '../config/db.js';
import { NotFoundError } from '../errors.js';
import { MeasureBook } from '../models/MeasureBook.js';

export class MeasureBookDAO {
    async getByPatientId(id) {
        const query = `
                    SELECT mb.scheduled_at,
                           mb.completed_at,
                           m.name,
                           m.measure_unit
                        AS scheduled_at,
                           completed_at,
                           measure_name,
                           measure_unit 
                      FROM croc.measure_book mb
                           JOIN croc.measure m ON m.id = mb.measure_type
                     WHERE patient = $1`;
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows.map(measureData => new MeasureBook(
            measureData.id,
            measureData.patient,
            measureData.measure_type,
            measureData.scheduled_at,
            measureData.completed_at
        ));
    }

    async getData(measure_book_id) {
        try {
            const query = `
                        SELECT mb.id AS id,
                                scheduled_at,
                                completed_at,
                                pt.surname AS patient_surname,
                                pt.firstname AS patient_firstname,
                                pt.lastname AS patient_lastname,
                                birth_date,
                                wd.name AS ward_name,
                                st.surname AS doctor_surname,
                                st.firstname AS doctor_firstname,
                                st.lastname AS doctor_lastname,
                                dg.name AS diagnosis,
                                allergy,
                                m.name,
                                m.measure_unit,
                                'measure' AS task_type,
                                result
                        FROM croc.measure_book mb
                                JOIN croc.measure m ON mb.measure_type = m.id
                                JOIN croc.patient pt ON mb.patient = pt.id
                                JOIN croc.anamnesis an ON an.patient = pt.id
                                JOIN croc.ward wd ON wd.id = an.ward
                                JOIN croc.diagnosis dg ON dg.id = an.diagnosis
                                JOIN croc.staff st ON st.id = an.doctor
                        WHERE an.discharge_date IS NULL AND
                                mb.id = $1;`
            const result = await db.query(query, [measure_book_id]);
            if (!result || result.rows.length === 0) {
                throw new NotFoundError('Данное измерение не найдено');
            }
            return result.rows[0];
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].message);
                throw new DatabaseIsDownError(error.errors[0].message);
            } else {
                console.error(error.message);
                throw new Error(error.message);
            }
        }
    }

    async add(measureData) {
        const query = `
            INSERT INTO croc.measure_book (patient, measure_type, scheduled_at)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const result = await db.query(query, measureData.getDataByList());
        return result.rows[0].id;
    }

    async update(measure_book_id, completed_at, result) {
        const query = `UPDATE croc.measure_book mb
                          SET completed_at = $1::TIMESTAMP,
                              result = $2
                        WHERE mb.id = $3`;
        await db.query(query, [completed_at, result, measure_book_id]);
    }
}