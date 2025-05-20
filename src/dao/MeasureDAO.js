import db from '../config/db.js';
import { Measure } from '../models/Measure.js';

export class MeasureDAO {
    async getAll() {
        const query = 'SELECT * FROM croc.measure';
        const result = await db.query(query);
        return result.rows.map(measureData => new Measure(
            measureData.id,
            measureData.name,
            measureData.measure_unit
        ));
    }

    async getById(id) {
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
    }
}