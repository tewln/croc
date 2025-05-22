import { DepartmentDAO } from '../dao/DepartmentDAO.js';
import { BadRequestError, NotFoundError, InternalServerError } from '../errors.js';

const dao = new DepartmentDAO();

export class DepartmentService {
    async getById(id) {
        try {
            if (!id) {
                throw new BadRequestError('ID отделения не указан');
            }

            const department = await dao.getById(id);
            if (!department) {
                throw new NotFoundError('Отделение не найдено');
            }
            return department;
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof BadRequestError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении отделения: ${error.message}`);
        }
    }

    async getDepartmentsOf(staff_id, organization_id) {
        try {
            if (!staff_id) {
                throw new BadRequestError('ID сотрудника не указан');
            }

            if (!organization_id) {
                throw new BadRequestError('ID организации не указан');
            }

            const departments = await dao.getDepartmentsOf(staff_id, organization_id);
            if (!departments || departments.length === 0) {
                throw new NotFoundError('Отделения не найдены');
            }
            return departments;
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof BadRequestError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении отделений: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const departments = await dao.getAll();
            if (!departments || departments.length === 0) {
                throw new NotFoundError('Отделения не найдены');
            }
            return departments;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении списка отделений: ${error.message}`);
        }
    }
}
