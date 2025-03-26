import UserDAO from '../dao/UserDAO.js';
import User from '../models/User.js';

class UserService {
    async getUserById(id) {
        const userData = await UserDAO.getUserById(id);
        if (!userData) {
            throw new Error('Пациент не найден');
        }
        return new User(
            userData.id,
            userData.login,
            userData.password
        );
    }

    async createUser(login, password) {
        const userId = await UserDAO.addUser(login, password);
        return userId;
    }

    async validUser(login) {
        const userId = await UserDAO.getUserByLogin(login);
        return userId;
    }

    async deleteUser(id) {
        await UserDAO.deleteUserById(id);
    }
}

export default new UserService();