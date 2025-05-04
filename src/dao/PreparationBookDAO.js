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
											pr.name,
											pb.quantity,
											pr.narcotic
                                      FROM croc.preparation_book pb
                                           JOIN patient_data pd ON pb.patient = pd.id
                                           JOIN croc.preparation pr ON pb.preparation = pr.id
                             WHERE pb.scheduled_at = $5 AND
                              		pr.name = $6;`
        const result = await db.query(query, [surname, firstname, lastname, birth_date, scheduled_at, preparation])
        return result.rows;
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

    async update(id, completed_at) {
        const query = `
                UPDATE croc.preparation_book
                   SET completed_at = $1
                 WHERE id = $2
        `;
        await db.query(query, [completed_at, id]);
    }
}
