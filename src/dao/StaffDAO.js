import db from '../config/db.js';
import { Staff } from '../models/Staff.js';
import '../errors.js';

export class StaffDAO {
    async getById(id) {
        try {
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
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async getByUserId(user_id) {
        try {
            const query = `SELECT st.id, st.surname, st.firstname, st.lastname, st.position FROM croc.staff st
                              JOIN croc.user us ON st.id = us.staff
                            WHERE us.id = $1`
            const result = await db.query(query, [user_id])
            if (result.rows.length === 0) {
                throw new NotFoundError('Препарат не найден');
            }
            const staffData = result.rows[0];
            return new Staff(
                staffData.id,
                staffData.firstname,
                staffData.surname,
                staffData.lastname,
                staffData.position,
            );
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async getInfoByStaffId(staff_id) {
        try {
            const query = `SELECT surname || ' ' || firstname || ' ' || COALESCE(lastname, '') AS staff_full_name,
                                  position
                            FROM croc.staff 
                            WHERE id = $1`;
            const result = await db.query(query, [staff_id]);
            if (result.rows.length === 0) {
                throw new NotFoundError('Препарат не найден');
            }
            return result.rows[0];
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
}