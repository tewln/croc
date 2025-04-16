import { UserDAO } from '../dao/UserDAO.js';
const dao = new UserDAO();

export class UserService {
    async getById(id) {
        const userData = await dao.getById(id);
        if (!userData) {
            throw new Error('Пациент не найден');
        }
        return userData;
    }

    async create(login, password, staff) {
        const userId = await dao.add(login, password, staff);
        if (userId === null) {
            throw new Error('Аккаунт уже существует');
        }
        else if(userId === login){
            throw new Error('Такой логин уже существует');
        }
        return userId;
    }

    async validation(login, password) {
        const userData = await dao.authentication(login, password);
        return userData;
    }

    async delete(id) {
        await dao.deleteById(id);
    }
}
//аналогично PatientService
