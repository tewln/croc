import { UserDAO } from '../dao/UserDAO.js';
import { BadRequestError } from '../errors.js';
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

    async create(login, password, staff) {
        const hash = await crypt.hash(password)
        const userId = await dao.add(login, hash, staff);
        if (userId === null) {
            throw new Error('Аккаунт уже существует');
        }
        else if(userId === login){
            throw new Error('Такой логин уже существует');
        }
        return userId;
    }

    async getStaffIdById(id) {
        return staff.getIdByUserId(id);
    }

    async setDepartment(departmentId) {
        if (!departmentId) {
            throw new BadRequestError('Поле отделения пусто');
        }
        return departmentId;
    }

    async setOrganization(organizationId) {
        if (!organizationId) {
            throw new BadRequestError('Поле организации пусто');
        }
        return organizationId;
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
