import db from '../config/db.js';
import {Staff} from '../models/Staff.js';

export class StaffDAO {
    async getById(id) {
        const query = 'SELECT * FROM croc.staff WHERE id = $1';
        const result = await db.query(query, [id]);
        if(result.rows.length === 0) {
            return null;
        }
        const staffData = result.rows[0];
        return new Staff(
            staffData.id,
            staffData.firstname,
            staffData.surname,
            staffData.lastname,
            staffData.position,
        );
    }
    async getByUserId(user_id) {
        const query = `SELECT st.id, st.surname, st.firstname, st.lastname, st.position FROM croc.staff st
                          JOIN croc.user us ON st.id = us.staff
                        WHERE us.id = $1`
        const result = await db.query(query, [user_id])
        const staffData = result.rows[0];
        return new Staff(
            staffData.id,
            staffData.firstname,
            staffData.surname,
            staffData.lastname,
            staffData.position,
        );
    }
    async getInfoByStaffId(staff_id) {
        const query = `SELECT surname || ' ' || firstname || ' ' || COALESCE(lastname, '') AS staff_full_name,
                              position
                        FROM croc.staff 
                        WHERE id = $1`;
        const result = await db.query(query, [staff_id]);
        return result.rows[0];
    }
}