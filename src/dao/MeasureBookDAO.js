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