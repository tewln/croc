import db from '../config/db.js';
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

    async getByData(scheduled_at, surname, firstname, lastname, birth_date, preparation) {
        const query = `WITH patient_data AS (
                                SELECT p.id, 
                                       p.surname || ' ' || p.firstname || ' ' || COALESCE(p.lastname, '') AS patient_full_name,
                                       p.birth_date,
                                       w.name AS ward_name,
                                       st.surname || ' ' || st.firstname || ' ' || COALESCE(st.lastname, '') AS doctor_full_name,
                                       d.name AS diagnosis,
                                       p.allergy
                                  FROM croc.patient p
                                       LEFT JOIN croc.anamnesis a ON p.id = a.patient
                                       LEFT JOIN croc.diagnosis d ON d.id = a.diagnosis
                                       LEFT JOIN croc.ward w ON a.ward = w.id
                                       LEFT JOIN croc.staff st ON st.id = a.doctor
                                 WHERE a.discharge_date IS NULL AND
                                       p.surname = $1 AND
                                       p.firstname = $2 AND
                                       p.lastname = $3 AND
                                       p.birth_date = $4
                            )
                     SELECT scheduled_at,
                            patient_full_name,
                            birth_date,
                            ward_name,
                            doctor_full_name,
                            diagnosis,
                            allergy,
                            m.name,
                            m.measure_unit,
                            'measure' AS task_type
                       FROM croc.measure_book mb
                            JOIN patient_data pd ON mb.patient = pd.id
                            JOIN croc.measure m ON mb.measure_type = m.id
                      WHERE mb.scheduled_at = $5 AND
                            m.name = $6;`
        const result = await db.query(query, [surname, firstname, lastname, birth_date, scheduled_at, preparation])
        return result.rows[0];
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

    async update(id, completed_at) {
        const query = 'UPDATE croc.measure_book SET completed_at = $1 WHERE id = $2';
        await db.query(query, [completed_at, id]);
    }
}