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
