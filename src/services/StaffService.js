import { StaffDAO } from '../dao/StaffDAO.js';
import { Header } from '../models/Header.js';
import { OrganizationService } from '../services/OrganizationService.js';
import { DepartmentService } from '../services/DepartmentService.js';
import { NotFoundError, InternalServerError, ServiceUnavailableError, ValidationError } from '../errors.js';

const dao = new StaffDAO();
const orgService = new OrganizationService();
const depService = new DepartmentService();

export class StaffService {
    async getById(id) {
        try {
            const staffData = await dao.getById(id);
            if (!staffData) {
                throw new NotFoundError('Сотрудник не найден');
            }
            return staffData.id;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении данных сотрудника: ${error.message}`);
        }
    }
    
    async getIdByUserId(user_id) {
        try {
            const staffData = await dao.getByUserId(user_id);
            if (!staffData) {
                throw new NotFoundError('Сотрудник не найден');
            }
            return staffData.id;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении данных сотрудника по ID пользователя: ${error.message}`);
        }
    }
    
    async getHeaderByStaffId(staff_id, organization_id, department_id) {
        try {
            const errors = [];
            if (!staff_id) errors.push('staff_id');
            if (!organization_id) errors.push('organization_id');
            if (!department_id) errors.push('department_id');
            if (errors.length > 0) {
                throw new ValidationError('Не все обязательные поля заполнены', errors);
            }
            const organization = await orgService.getById(organization_id);
            const organization_name = organization.name;
            const department = await depService.getById(department_id);
            const department_name = department[0].name;
            const staff = await dao.getInfoByStaffId(staff_id);
            if (!staffInfo) {
                throw new NotFoundError('Информация о сотруднике не найдена');
            }
            return new Header(
                staff.staff_full_name,
                staff.position,
                organization_name,
                department_name,
            );
        } catch (error) {
            if (error instanceof ValidationError ||
                error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении информации о сотруднике: ${error.message}`);
        }
    }
}
