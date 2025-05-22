import { UserDAO } from '../dao/UserDAO.js';
import '../errors.js';
import { InternalServerError } from '../errors.js';
import { User } from '../models/User.js';
import { StaffService } from '../services/StaffService.js';
import crypt from 'argon2';
const dao = new UserDAO();
const staff = new StaffService();

export class UserService {
    async getById(id) {
        try {
            const userData = await dao.getById(id);
            if (!userData) {
                throw new NotFoundError('Пользователь не найден');
            }
            return userData;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async create(login, password, staff) {
        try {
            const errors = [];
            if (!login) errors.push('login');
            if (!password) errors.push('password');
            if (!staff) errors.push('staff');
            if (errors.length > 0) {
                throw new ValidationError('Не все обязательные поля заполнены', errors);
            }
            const existingUserByLogin = await dao.get(login);
            if (existingUserByLogin) {
                throw new ConflictError('Пользователь с таким логином уже существует');
            }
            
            const existingUserByStaff = await dao.getByStaffId(staff);
            if (existingUserByStaff) {
                throw new ConflictError('Пользователь с таким ID персонала уже существует');
            }
            const hashedPassword = await crypt.hash(password);
            return await dao.add(login, hashedPassword, staff);
        } catch (error) {
            if (error instanceof ConflictError ||
                error instanceof ValidationError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            } else if (error.code === '23505') {
                if (error.detail && error.detail.includes('login')) {
                    throw new ConflictError('Пользователь с таким логином уже существует');
                } else if (error.detail && error.detail.includes('staff')) {
                    throw new ConflictError('Пользователь с таким ID персонала уже существует');
                } else {
                    throw new ConflictError('Пользователь с такими данными уже существует');
                }
            } else {
                console.error(error.stack);
                throw new InternalServerError(`Ошибка при создании пользователя: ${error.message}`);
            }
        }
    }
    
    async validation(login, password) {
        try {
            const userData = await dao.get(login);
            if (!userData) {
                throw new UnauthorizedError('Неверный логин');
            }
            const isPasswordValid = await crypt.verify(userData.password, password);
            if (isPasswordValid) {
                return new User(
                    userData.id,
                    userData.login,
                    userData.password
                );
            } else {
                throw new UnauthorizedError('Неверный пароль');
            }
        } catch (error) {
            if (error instanceof UnauthorizedError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при валидации пользователя: ${error.message}`);
        }
    }

    async getStaffIdById(id) {
        try {
            const userData = await dao.getById(id);
            return userData.staff;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError
            ) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении ID персонала: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            if (!id) {
                throw new BadRequestError('Не указан ID для удаления');
            }
            return await dao.deleteById(id);
        } catch (error) {
            if (error instanceof BadRequestError ||
                error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при удалении пользователя: ${error.message}`);
        }
    }

    async setDepartment(department_id) {
        if (!department_id) {
            throw new BadRequestError('Не указан ID отделения');
        }
        return department_id;
    }

    async setOrganization(organization_id) {
        if (!organization_id) {
            throw new BadRequestError('Не указан ID организации');
        }
        return organization_id;
    }
}
