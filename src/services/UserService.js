import { UserDAO } from '../dao/UserDAO.js';
import { User } from '../models/User.js';
import { StaffService } from '../services/StaffService.js';
import crypt from 'argon2';
const dao = new UserDAO();
const staff = new StaffService();

export class UserService {
    async getById(id) {
        const userData = await dao.getById(id);
        if (!userData) {
            throw new Error('Пользователь не найден');
        }
        return userData;
    }

    async create(login, password) {
        const userId = await dao.add(login, password);
        return userId;
    }

    async getStaffIdById(id) {
        return staff.getIdByUserId(id);
    }

    async validation(login, password) {
        const userData = await dao.get(login);
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
}
