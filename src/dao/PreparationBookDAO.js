import db from '../config/db.js';
import { PreparationBook } from '../models/PreparationBook.js';

export class PreparationBookDAO {
    async getByPatientId(id) {
        const query = `
                    SELECT pb.*, p.name AS preparation_name 
                      FROM croc.preparation_book pb
                           JOIN croc.preparation p ON p.id = pb.preparation
                     WHERE patient = $1`;
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows.map(bookData => new PreparationBook(
            bookData.id,
            bookData.patient,
            bookData.preparation,
            bookData.quantity,
            bookData.scheduled_at,
            bookData.completed_at
        ));
    }

    async getByData(preparation_book_id) {
        try {
            const query = `
                        SELECT pb.id
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
                                pr.name,
                                d.dosage,
                                mu.measure_unit,
                                pb.quantity,
                                pr.narcotic,
                                'preparation' AS task_type
                        FROM croc.preparation_book pb
                                JOIN croc.preparation pr ON pb.preparation = pr.id
                                JOIN croc.dosage d ON d.id = pb.dosage
                                JOIN croc.measure_unit mu ON mu.id = d.measure_unit
                                JOIN croc.patient pt ON pt.id = pb.patient
                                JOIN croc.anamnesis an ON an.patient = pt.id
                                JOIN croc.ward wd ON wd.id = an.ward
                                JOIN croc.diagnosis dg ON dg.id = an.diagnosis
                                JOIN croc.staff st ON st.id = an.doctor
                        WHERE an.discharge_date IS NULL AND 
                              pb.id = $1;`
            const result = await db.query(query, [preparation_book_id])
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

    async add(preparationBook) {
        const query = `
            INSERT INTO croc.preparation_book (patient, preparation, dosage, quantity, scheduled_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const result = await db.query(query, preparationBook.getDataByList());
        return result.rows[0].id;
    }

    async update(preparation_book_id, completed_at) {
        const query = `UPDATE croc.preparation_book pb
                          SET completed_at = $1
                        WHERE pb.id = $2`;
        await db.query(query, [completed_at, preparation_book_id]);
    }
}
