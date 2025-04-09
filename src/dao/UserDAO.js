import db from '../config/db.js';
import crypt from 'argon2';
import {User} from '../models/User.js';

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

    async getByLogin(login) {
        const query = 'SELECT * FROM croc."user" WHERE login = $1';
        const result = await db.query(query, [login]);
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

    async add(login, password) {
        const query = `
            INSERT INTO croc."user" (login, password)
            VALUES ($1, $2)
            RETURNING id
        `;
        const hash = await crypt.hash(password)
        const result = await db.query(query, [login, hash]);
        return result.id;
    }

    async authentication(login, password) {
        const query = `SELECT * FROM croc."user" WHERE login = $1`;
        const result = await db.query(query, [login]);
        if(result.rows.length === 0) {
            return null;
        }
        const userData = result.rows[0]
        const isPasswordValid = await crypt.verify(userData.password, password);
        if (isPasswordValid) {
            return new User(
                userData.id,
                userData.login,
                userData.password
            );
        } else {
            return null;
        }
    }

    async deleteById(id) {
        const query = 'DELETE FROM croc."user" WHERE id = $1';
        await db.query(query, [id]);
    }
}