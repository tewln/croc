import db from '../config/db.js';

class PatientDAO {
    async getPatientById(id) {
        const query = 'SELECT * FROM croc.patient WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0] || null;
    }

    async getPatients() {
        const result = await db.query('SELECT * FROM croc.patient');
        return result.rows || [];
    }

    async addPatient(firstname, surname, lastname, birth_date, allergy) {
        const query = `
            INSERT INTO croc.patient (firstname, surname, lastname, birth_date, allergy)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const result = await db.query(query, [firstname, surname, lastname, birth_date, allergy]);
        
        return result.id;
    }

    async deletePatientById(id) {
        const query = 'DELETE FROM croc.patient WHERE id = $1';
        await db.query(query, [id]);
    }
}

export default new PatientDAO();