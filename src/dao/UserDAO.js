import db from '../config/db.js';
import { User } from '../models/User.js';
import '../errors.js';

export class UserDAO {
    async getById(id) {
        const query = 'SELECT * FROM croc."user" WHERE id = $1';
        const result = await db.query(query, [id]);
        if(result.rows.length === 0) {
            return null;
        }
        const userData = result.rows[0];
        return new User(
            userData.id,
            userData.login,
            userData.password
        );
    }

    async add(login, password, staff) {
        const checkQuery = `SELECT * FROM croc.user WHERE staff = $1`;
        const query = `
            INSERT INTO croc.user (login, password, staff)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const isLoginUse = await this.get(login);
        const isStaffUser = await db.query(checkQuery, [staff]);

        if(isStaffUser.rows.length === 0) {
            if(isLoginUse !== null) {
                console.log(isLoginUse);
                return login;
            }
            const result = await db.query(query, [login, password, staff]);
            return result.id;
        }
        return null;
    }

    async deleteById(id) {
        const query = 'DELETE FROM croc."user" WHERE staff = $1';
        await db.query(query, [id]);
    }

    async get(login) {
        const query = `SELECT * FROM croc."user" WHERE login = $1`;
        try {
        const result = await db.query(query, [login]);
        if(result.rows.length === 0) {
            return null;
        }
        const userData = result.rows[0]
        return userData;
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
}