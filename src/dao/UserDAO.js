import db from '../config/db.js';
import crypt from 'bcrypt';
import User from '../models/User.js';

class UserDAO {
    async getUserById(id) {
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

    async addUser(login, password) {
        const query = `
            INSERT INTO croc."user" (login, password)
            VALUES ($1, $2)
            RETURNING id
        `;
        const result = await db.query(query, [login, crypt.hash(password, 100)]);
        return result.id;
    }

    async validUser(login, password) {
        const query = `SELECT * FROM croc."user" WHERE login = $1`;
        const result = await db.query(query, [login]);
        //если такого логина не существует - вернуть ошибку пользователя
        const isPasswordValid = crypt.compare(result.rows[0].password, password);
        if (isPasswordValid) {
            //возвращаем 200
        } else {
            //возвращаем ошибку
        }
    }

    async deleteUserById(id) {
        const query = 'DELETE FROM croc."user" WHERE id = $1';
        await db.query(query, [id]);
    }
}

export default new UserDAO();