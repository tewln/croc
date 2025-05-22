import db from '../config/db.js';
import { User } from '../models/User.js';
import '../errors.js';

export class UserDAO {
    async getById(id) {
        try {
            const query = 'SELECT * FROM croc."user" WHERE id = $1';
            const result = await db.query(query, [id]);
            if(result.rows.length === 0) {
                throw new NotFoundError('Пользователь не найден');
            }
            const userData = result.rows[0];
            return new User(
                userData.id,
                userData.login,
                userData.password
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

    async add(login, password, staff) {
        try {
            const query = `
                INSERT INTO croc.user (login, password, staff)
                VALUES ($1, $2, $3)
                RETURNING id
            `;
            const result = await db.query(query, [login, password, staff]);
            return result.rows[0].id;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else if (error.code === '23505') {
                throw error;
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async deleteById(id) {
        try {
            const query = 'DELETE FROM croc."user" WHERE staff = $1';
            const result = await db.query(query, [id]);
            if (result.rowCount === 0) {
                throw new NotFoundError('Пользователь не найден');
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.code === 'ECONNREFUSED') {
                console.error(error.stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async get(login) {
        try {
            const query = `SELECT * FROM croc."user" WHERE login = $1`;
            const result = await db.query(query, [login]);
            if(result.rows.length === 0) {
                return null;
            }
            const userData = result.rows[0];
            return userData;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
    
    async getByStaffId(staffId) {
        try {
            const query = `SELECT * FROM croc."user" WHERE staff = $1`;
            const result = await db.query(query, [staffId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
}