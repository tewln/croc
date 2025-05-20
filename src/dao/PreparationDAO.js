import db from '../config/db.js';
import { Preparation } from '../models/Preparation.js';

export class PreparationDAO {
    async getAll() {
        const query = 'SELECT * FROM croc.preparation';
        const result = await db.query(query);
        return result.rows.map(prepData => new Preparation(
            prepData.id,
            prepData.name,
            prepData.narcotic
        ));
    }

    async getById(id) {
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
    }

    async add(preparation) {
        const query = `
            INSERT INTO croc.preparation_book (patient, preparation, quantity, date)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;
        const result = await db.query(query, preparation.getDataByList());
        return result.rows[0].id;
    }

    async delete(id) {
        const query = 'DELETE FROM croc.preparation WHERE id = $1';
        await db.query(query, [id]);
    }
    
    async getDosages(preparationId) {
        const query = 'SELECT * FROM croc.dosage WHERE preparation_id = $1';
        const result = await db.query(query, [preparationId]);
        return result.rows;
    }
}