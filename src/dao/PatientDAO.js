import db from '../config/db.js';
import { Patient } from '../models/Patient.js';

export class PatientDAO {
    async getById(id) {
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
    }

    async getAll() {
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
    }

    async add(patientData) {
        const query = `
            INSERT INTO croc.patient (firstname, surname, lastname, birth_date, allergy)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const result = await db.query(query, patient.getDataByList());
        
        return result.rows[0].id;
    }

    async delete(id) {
        const query = 'DELETE FROM croc.patient WHERE id = $1';
        await db.query(query, [id]);
    }
}
